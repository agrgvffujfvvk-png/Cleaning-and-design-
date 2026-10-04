/* =========================================================
   مُرتّب — CONTENT EXTRACTOR
   PDF / DOCX / TXT / IMAGE OCR
   ========================================================= */

(() => {
  "use strict";


  const CONFIG = {

    /* OCR language.
       Tesseract will download its language data
       when OCR is used for the first time. */

    ocrLanguage:
      "ara+eng",

    pdfWorker:
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs",

    tesseractScript:
      "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",

    mammothScript:
      "https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js"

  };


  /* =======================================================
     UTILITIES
     ======================================================= */

  function normalizeText(text) {

    return String(text || "")

      .replace(/\r\n/g, "\n")

      .replace(/\r/g, "\n")

      .replace(/\u00a0/g, " ")

      .replace(/[ \t]+/g, " ")

      .replace(/\n[ \t]+/g, "\n")

      .replace(/[ \t]+\n/g, "\n")

      .replace(/\n{4,}/g, "\n\n")

      .trim();
  }


  function filenameWithoutExtension(name) {

    return String(name || "")
      .replace(/\.[^/.]+$/, "")
      .trim();
  }


  function getExtension(name) {

    const match =
      String(name || "")
        .toLowerCase()
        .match(/\.([a-z0-9]+)$/);

    return match
      ? match[1]
      : "";
  }


  function loadScript(src) {

    return new Promise(
      (resolve, reject) => {

        const existing =
          document.querySelector(
            `script[src="${src}"]`
          );


        if (existing) {

          if (
            existing.dataset.loaded ===
            "true"
          ) {

            resolve();

          } else {

            existing.addEventListener(
              "load",
              () => resolve(),
              { once: true }
            );

            existing.addEventListener(
              "error",
              () =>
                reject(
                  new Error(
                    `Could not load ${src}`
                  )
                ),
              { once: true }
            );
          }

          return;
        }


        const script =
          document.createElement(
            "script"
          );


        script.src = src;

        script.async = true;


        script.addEventListener(
          "load",
          () => {

            script.dataset.loaded =
              "true";

            resolve();

          },
          { once: true }
        );


        script.addEventListener(
          "error",
          () => {

            reject(
              new Error(
                `Could not load ${src}`
              )
            );

          },
          { once: true }
        );


        document.head.appendChild(
          script
        );

      }
    );
  }


  /* =======================================================
     TXT
     ======================================================= */

  async function extractTXT(file) {

    const text =
      await file.text();


    return {

      success: true,

      text:
        normalizeText(text),

      title:
        filenameWithoutExtension(
          file.name
        ),

      type: "text"

    };
  }


  /* =======================================================
     PDF
     ======================================================= */

  async function extractPDF(file) {

    let pdfjs =
      window.pdfjsLib;


    /*
      PDF.js modern builds may expose the library
      differently depending on browser/CDN.
    */

    if (!pdfjs) {

      try {

        const module =
          await import(
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs"
          );

        pdfjs =
          module;

      } catch (error) {

        throw new Error(
          "PDF.js could not be loaded."
        );

      }
    }


    if (
      pdfjs.GlobalWorkerOptions
    ) {

      pdfjs.GlobalWorkerOptions.workerSrc =
        CONFIG.pdfWorker;

    }


    const buffer =
      await file.arrayBuffer();


    const loadingTask =
      pdfjs.getDocument({
        data: buffer
      });


    const pdf =
      await loadingTask.promise;


    const pages = [];


    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {

      const page =
        await pdf.getPage(
          pageNumber
        );


      const content =
        await page.getTextContent();


      const strings =
        content.items
          .map(item =>
            item.str || ""
          )
          .filter(Boolean);


      pages.push(
        strings.join(" ")
      );

    }


    const text =
      normalizeText(
        pages.join("\n\n")
      );


    return {

      success: true,

      text,

      title:
        filenameWithoutExtension(
          file.name
        ),

      type: "pdf",

      pages: pdf.numPages

    };
  }


  /* =======================================================
     DOCX
     ======================================================= */

  async function extractDOCX(file) {

    if (
      !window.mammoth
    ) {

      await loadScript(
        CONFIG.mammothScript
      );

    }


    if (
      !window.mammoth
    ) {

      throw new Error(
        "DOCX reader could not be loaded."
      );

    }


    const arrayBuffer =
      await file.arrayBuffer();


    const result =
      await window.mammoth.extractRawText({
        arrayBuffer
      });


    return {

      success: true,

      text:
        normalizeText(
          result.value
        ),

      title:
        filenameWithoutExtension(
          file.name
        ),

      type: "docx",

      messages:
        result.messages || []

    };
  }


  /* =======================================================
     IMAGE OCR
     ======================================================= */

  async function extractImage(file) {

    if (
      !window.Tesseract
    ) {

      await loadScript(
        CONFIG.tesseractScript
      );

    }


    if (
      !window.Tesseract
    ) {

      throw new Error(
        "OCR engine could not be loaded."
      );

    }


    /*
      Tesseract.js supports Arabic and English.
      The first OCR run can take longer because
      language data must be prepared/downloaded.
    */

    const result =
      await window.Tesseract.recognize(
        file,
        CONFIG.ocrLanguage,
        {

          logger: message => {

            if (
              message &&
              typeof message.progress ===
                "number"
            ) {

              window.dispatchEvent(
                new CustomEvent(
                  "murattab-ocr-progress",
                  {
                    detail: message
                  }
                )
              );

            }

          }

        }
      );


    const text =
      normalizeText(
        result?.data?.text || ""
      );


    if (!text) {

      throw new Error(
        "No readable text was found in the image."
      );

    }


    return {

      success: true,

      text,

      title:
        filenameWithoutExtension(
          file.name
        ),

      type: "image",

      confidence:
        result?.data?.confidence ?? null

    };
  }


  /* =======================================================
     GENERIC FILE EXTRACTION
     ======================================================= */

  async function extractFile(file) {

    if (!file) {

      return {

        success: false,

        message:
          "No file was selected."

      };

    }


    const extension =
      getExtension(file.name);


    try {

      switch (extension) {

        case "txt":

          return await extractTXT(
            file
          );


        case "pdf":

          return await extractPDF(
            file
          );


        case "docx":

          return await extractDOCX(
            file
          );


        default:

          return {

            success: false,

            message:
              "Unsupported file type. Please choose PDF, DOCX or TXT."

          };

      }

    } catch (error) {

      console.error(
        "Murattab extractor error:",
        error
      );


      return {

        success: false,

        message:
          error?.message ||
          "Could not extract text from the file."

      };
    }
  }


  /* =======================================================
     CLEAN EXTRACTED TEXT
     ======================================================= */

  function cleanExtractedText(text) {

    let value =
      normalizeText(text);


    /*
      Remove excessive repeated separators
      that commonly appear in copied documents.
    */

    value =
      value.replace(
        /[•·]{4,}/g,
        ""
      );


    value =
      value.replace(
        /_{4,}/g,
        ""
      );


    value =
      value.replace(
        /-{5,}/g,
        ""
      );


    /*
      Fix spaces around punctuation.
    */

    value =
      value.replace(
        /\s+([،؛؟,:.!])/g,
        "$1"
      );


    value =
      value.replace(
        /([،؛؟,:.!])([^\s\n])/g,
        "$1 $2"
      );


    return value.trim();
  }


  /* =======================================================
     DETECT POSSIBLE TITLE
     ======================================================= */

  function detectTitle(text, fallback = "") {

    const clean =
      cleanExtractedText(text);


    if (!clean) {
      return fallback;
    }


    const lines =
      clean
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);


    if (!lines.length) {
      return fallback;
    }


    /*
      Prefer a short first line as a title.
    */

    const first =
      lines[0];


    if (
      first.length >= 3 &&
      first.length <= 100
    ) {

      return first;
    }


    return fallback;
  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.MurattabExtractor = {

    extractFile,

    extractImage,

    extractTXT,

    extractPDF,

    extractDOCX,

    cleanText:
      cleanExtractedText,

    detectTitle,

    normalizeText

  };

})();