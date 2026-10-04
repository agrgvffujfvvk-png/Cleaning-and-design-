/* =========================================================
   مُرتّب — APP CONTROLLER
   ========================================================= */

(() => {
  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const state = {
    source: null,
    title: "",
    type: "lesson",
    content: "",
    language: localStorage.getItem("murattab-language") || "ar",
    theme: localStorage.getItem("murattab-theme") || "light",
    zoom: 1,
    savedDocuments:
      JSON.parse(localStorage.getItem("murattab-documents") || "[]")
  };


  /* =======================================================
     TRANSLATIONS
     ======================================================= */

  const translations = {

    ar: {
      appName: "مُرتّب",
      appSubtitle: "تنظيم المحتوى باحتراف",

      whatCanIDo: "ماذا يمكنني أن أفعل؟",
      home: "الرئيسية",
      workspace: "مساحة العمل",
      saved: "المحفوظات",

      ready: "جاهز لتنظيم محتواك",

      heroTitle:
        "حوّل المحتوى الخام<br>إلى مستند احترافي.",

      heroDescription:
        "أضف نصاً أو ملفاً أو صورة، ثم عدّل المحتوى وشاهد النتيجة مباشرة قبل حفظها.",

      fileTitle: "ملف",
      fileDescription:
        "استخرج النص من ملف وابدأ تنظيمه.",
      chooseFile: "اختيار ملف",

      imageTitle: "صورة",
      imageDescription:
        "استخرج النص من صورة أو صفحة مصورة.",
      chooseImage: "اختيار صورة",

      textTitle: "نص",
      textDescription:
        "اكتب أو الصق المحتوى بنفسك.",
      writeText: "ابدأ الكتابة",

      livePreview: "معاينة حية",
      livePreviewDesc:
        "شاهد المستند أثناء تعديله.",

      multipleFormats: "عدة صيغ",
      multipleFormatsDesc:
        "ملف عادي، PDF أو صور.",

      manualEdit: "تعديل يدوي",
      manualEditDesc:
        "أنت تتحكم في النتيجة النهائية.",

      back: "رجوع",
      newDocument: "مستند جديد",
      reset: "إعادة ضبط",
      saveDocument: "حفظ المستند",

      content: "المحتوى",
      editDocument: "تحرير المستند",

      documentTitle: "عنوان المستند",
      titlePlaceholder: "اكتب عنوان المستند...",

      documentType: "نوع المحتوى",
      lesson: "درس",
      explanation: "شرح",
      article: "مقالة",

      font: "الخط",

      preview: "المعاينة",
      liveDocument: "المستند النهائي",

      page: "صفحة",

      library: "المكتبة",
      savedDocuments: "المستندات المحفوظة",
      savedDescription:
        "المستندات التي حفظتها على هذا الجهاز.",

      noSavedDocuments:
        "لا توجد مستندات محفوظة",

      noSavedDescription:
        "أنشئ مستنداً وسيظهر هنا.",

      saveTitle: "حفظ المستند",

      saveDescription:
        "اختر الصيغة التي تريد حفظ المستند بها.",

      normalFile: "ملف عادي",
      normalFileDesc: "مستند قابل للتحرير",

      pdfDesc: "جاهز للطباعة",

      images: "صور",
      imagesDesc:
        "حفظ صفحات المستند كصور",

      preferences: "التفضيلات",
      settings: "الإعدادات",

      language: "اللغة",
      languageDesc: "لغة واجهة الموقع",

      appearance: "المظهر",
      appearanceDesc: "اختر شكل الواجهة",

      light: "فاتح",
      dark: "داكن",

      guide: "دليل سريع",

      guideDescription:
        "شاهد كيف يتحول محتواك من مادة خام إلى مستند جاهز للحفظ والطباعة.",

      stepInput: "أضف المحتوى",
      stepExtract: "استخراج وتنظيم",
      stepEdit: "عدّل بنفسك",
      stepPreview: "شاهد النتيجة",
      stepSave: "احفظ",

      editorPlaceholder:
        "اكتب أو الصق محتوى المستند هنا...",

      words: "كلمة",
      characters: "حرف",

      fileReading: "جارٍ قراءة الملف...",
      imageReading: "جارٍ قراءة الصورة...",
      extractionDone: "تم استخراج النص بنجاح.",
      extractionFailed:
        "تعذر استخراج النص من هذا الملف.",

      saved: "تم حفظ المستند.",
      deleted: "تم حذف المستند.",
      resetDone: "تمت إعادة ضبط المستند.",

      noContent:
        "اكتب محتوى المستند أولاً.",

      fileTypeNotSupported:
        "نوع الملف غير مدعوم.",

      importedDocument: "مستند مستورد",

      untitled: "مستند بدون عنوان"
    },


    en: {
      appName: "Murattab",
      appSubtitle: "Professional content organization",

      whatCanIDo: "What can I do?",
      home: "Home",
      workspace: "Workspace",
      saved: "Saved",

      ready: "Ready to organize your content",

      heroTitle:
        "Turn raw content<br>into a professional document.",

      heroDescription:
        "Add text, a file, or an image, then edit and preview your document before saving it.",

      fileTitle: "File",
      fileDescription:
        "Extract text from a file and organize it.",
      chooseFile: "Choose file",

      imageTitle: "Image",
      imageDescription:
        "Extract text from an image or scanned page.",
      chooseImage: "Choose image",

      textTitle: "Text",
      textDescription:
        "Write or paste your content yourself.",
      writeText: "Start writing",

      livePreview: "Live preview",
      livePreviewDesc:
        "See the document while editing.",

      multipleFormats: "Multiple formats",
      multipleFormatsDesc:
        "File, PDF or images.",

      manualEdit: "Manual editing",
      manualEditDesc:
        "You control the final result.",

      back: "Back",
      newDocument: "New document",
      reset: "Reset",
      saveDocument: "Save document",

      content: "Content",
      editDocument: "Edit document",

      documentTitle: "Document title",
      titlePlaceholder: "Write the document title...",

      documentType: "Content type",
      lesson: "Lesson",
      explanation: "Explanation",
      article: "Article",

      font: "Font",

      preview: "Preview",
      liveDocument: "Final document",

      page: "Page",

      library: "Library",
      savedDocuments: "Saved documents",
      savedDescription:
        "Documents saved on this device.",

      noSavedDocuments:
        "No saved documents",

      noSavedDescription:
        "Create a document and it will appear here.",

      saveTitle: "Save document",

      saveDescription:
        "Choose the format you want to save the document in.",

      normalFile: "Regular file",
      normalFileDesc: "Editable document",

      pdfDesc: "Ready for printing",

      images: "Images",
      imagesDesc:
        "Save document pages as images",

      preferences: "Preferences",
      settings: "Settings",

      language: "Language",
      languageDesc: "Interface language",

      appearance: "Appearance",
      appearanceDesc: "Choose the interface appearance",

      light: "Light",
      dark: "Dark",

      guide: "Quick guide",

      guideDescription:
        "See how your raw content becomes a document ready to save and print.",

      stepInput: "Add content",
      stepExtract: "Extract & organize",
      stepEdit: "Edit manually",
      stepPreview: "Preview",
      stepSave: "Save",

      editorPlaceholder:
        "Write or paste your document content here...",

      words: "words",
      characters: "characters",

      fileReading: "Reading file...",
      imageReading: "Reading image...",
      extractionDone: "Text extracted successfully.",
      extractionFailed:
        "Could not extract text from this file.",

      saved: "Document saved.",
      deleted: "Document deleted.",
      resetDone: "Document reset.",

      noContent:
        "Write some document content first.",

      fileTypeNotSupported:
        "This file type is not supported.",

      importedDocument: "Imported document",

      untitled: "Untitled document"
    }
  };


  /* =======================================================
     TRANSLATION HELPER
     ======================================================= */

  function t(key) {
    return (
      translations[state.language]?.[key] ??
      translations.ar[key] ??
      key
    );
  }


  function applyTranslations() {

    $$("[data-i18n]").forEach(element => {

      const key = element.dataset.i18n;

      if (!translations[state.language]?.[key]) {
        return;
      }

      element.innerHTML =
        translations[state.language][key];
    });


    $$("[data-i18n-placeholder]").forEach(element => {

      const key =
        element.dataset.i18nPlaceholder;

      if (
        translations[state.language]?.[key]
      ) {
        element.placeholder =
          translations[state.language][key];
      }

      if (
        element.dataset.placeholder !== undefined
      ) {
        element.dataset.placeholder =
          translations[state.language][key];
      }
    });


    document.documentElement.lang =
      state.language;

    document.documentElement.dir =
      state.language === "ar"
        ? "rtl"
        : "ltr";

    $("#languageSelect").value =
      state.language;

    $("#themeSelect").value =
      state.theme;

    updateCounts();
  }


  /* =======================================================
     THEME
     ======================================================= */

  function applyTheme() {

    document.body.classList.toggle(
      "dark",
      state.theme === "dark"
    );

    localStorage.setItem(
      "murattab-theme",
      state.theme
    );

    $("#themeSelect").value =
      state.theme;
  }


  /* =======================================================
     PAGE NAVIGATION
     ======================================================= */

  function openPage(pageName) {

    $$(".page").forEach(page => {
      page.classList.remove("active");
    });

    const page =
      $(`#${pageName}Page`);

    if (page) {
      page.classList.add("active");
    }


    $$(".nav-item").forEach(item => {

      item.classList.toggle(
        "active",
        item.dataset.page === pageName
      );

    });


    closeSidebar();
  }


  /* =======================================================
     MODALS
     ======================================================= */

  function openModal(id) {

    const modal = $(`#${id}`);

    if (!modal) return;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }


  function closeModal(id) {

    const modal = $(`#${id}`);

    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    if (!$(".modal-overlay.open")) {
      document.body.classList.remove("modal-open");
    }
  }


  function closeAllModals() {

    $$(".modal-overlay.open")
      .forEach(modal => {
        modal.classList.remove("open");
        modal.setAttribute(
          "aria-hidden",
          "true"
        );
      });

    document.body.classList.remove("modal-open");
  }


  /* =======================================================
     SIDEBAR
     ======================================================= */

  function toggleSidebar() {

    $("#sidebar")?.classList.toggle("open");

  }


  function closeSidebar() {

    $("#sidebar")?.classList.remove("open");

  }


  /* =======================================================
     SOURCE SELECTION
     ======================================================= */

  function selectSource(source) {

    state.source = source;

    if (source === "file") {

      $("#fileInput").value = "";
      $("#fileInput").click();

      return;
    }


    if (source === "image") {

      $("#imageInput").value = "";
      $("#imageInput").click();

      return;
    }


    if (source === "text") {

      prepareNewDocument("text");

      openPage("workspace");

      setTimeout(() => {
        $("#documentTitle")?.focus();
      }, 100);

    }
  }


  function prepareNewDocument(source) {

    state.source = source;
    state.title = "";
    state.type = "lesson";
    state.content = "";

    $("#documentTitle").value = "";
    $("#documentType").value = "lesson";

    $("#editor").innerHTML = "";

    updatePreview();
    updateCounts();
  }


  /* =======================================================
     FILE IMPORT
     ======================================================= */

  async function handleFile(file) {

    if (!file) return;

    showToast(
      "info",
      t("fileReading")
    );


    try {

      const result =
        await window.MurattabExtractor
          .extractFile(file);


      if (!result || !result.success) {
        throw new Error(
          result?.message ||
          t("extractionFailed")
        );
      }


      state.source = "file";

      state.title =
        result.title ||
        file.name
          .replace(/\.[^/.]+$/, "")
          .trim();


      state.content =
        result.text || "";


      $("#documentTitle").value =
        state.title;

      $("#editor").innerHTML =
        textToEditorHTML(
          state.content
        );


      updatePreview();
      updateCounts();

      openPage("workspace");

      showToast(
        "success",
        t("extractionDone")
      );

    } catch (error) {

      console.error(error);

      showToast(
        "error",
        error.message ||
        t("extractionFailed")
      );

    }
  }


  /* =======================================================
     IMAGE IMPORT
     ======================================================= */

  async function handleImage(file) {

    if (!file) return;

    showToast(
      "info",
      t("imageReading")
    );


    try {

      const result =
        await window.MurattabExtractor
          .extractImage(file);


      if (!result || !result.success) {
        throw new Error(
          result?.message ||
          t("extractionFailed")
        );
      }


      state.source = "image";

      state.title =
        result.title ||
        t("importedDocument");


      state.content =
        result.text || "";


      $("#documentTitle").value =
        state.title;

      $("#editor").innerHTML =
        textToEditorHTML(
          state.content
        );


      updatePreview();
      updateCounts();

      openPage("workspace");

      showToast(
        "success",
        t("extractionDone")
      );

    } catch (error) {

      console.error(error);

      showToast(
        "error",
        error.message ||
        t("extractionFailed")
      );

    }
  }


  /* =======================================================
     TEXT → EDITOR HTML
     ======================================================= */

  function escapeHTML(text) {

    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  function textToEditorHTML(text) {

    if (!text) return "";

    const normalized =
      String(text)
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .trim();


    const blocks =
      normalized
        .split(/\n{2,}/)
        .map(block => block.trim())
        .filter(Boolean);


    if (!blocks.length) {

      return `<p>${escapeHTML(
        normalized
      )}</p>`;

    }


    return blocks.map(block => {

      const lines =
        block
          .split("\n")
          .map(line => line.trim())
          .filter(Boolean);


      if (lines.length === 1) {

        const line = lines[0];

        if (
          line.length <= 90 &&
          (
            /^(\d+[\.\-:]|\d+\))/.test(line) ||
            /^[#]/.test(line) ||
            /^(مقدمة|الخاتمة|الخلاصة|الأهداف|المحتوى|التعريف|النتائج|Introduction|Conclusion)$/i
              .test(line)
          )
        ) {

          return `<h2>${escapeHTML(
            line.replace(/^#+\s*/, "")
          )}</h2>`;

        }
      }


      return `<p>${lines
        .map(line => escapeHTML(line))
        .join("<br>")}</p>`;

    }).join("");
  }


  /* =======================================================
     EDITOR → CLEAN HTML
     ======================================================= */

  function getEditorHTML() {

    const editor = $("#editor");

    if (!editor) return "";

    return editor.innerHTML.trim();
  }


  function getEditorText() {

    const editor = $("#editor");

    if (!editor) return "";

    return editor.innerText
      .replace(/\u00a0/g, " ")
      .trim();
  }


  /* =======================================================
     PREVIEW
     ======================================================= */

  function getTypeLabel() {

    const map = {
      lesson: "lesson",
      explanation: "explanation",
      article: "article"
    };

    return t(
      map[state.type] || "lesson"
    );
  }


  function updatePreview() {

    const title =
      $("#documentTitle").value.trim() ||
      t("untitled");


    state.title = title;

    state.type =
      $("#documentType").value;


    state.content =
      getEditorText();


    $("#previewTitle").textContent =
      title;


    $("#previewType").textContent =
      getTypeLabel();


    const preview =
      $("#previewContent");


    const html =
      getEditorHTML();


    if (!html || !getEditorText()) {

      preview.innerHTML = `
        <p class="preview-empty">
          ${escapeHTML(
            state.language === "ar"
              ? "ابدأ بكتابة المحتوى لتظهر المعاينة هنا."
              : "Start writing to see the preview here."
          )}
        </p>
      `;

    } else {

      preview.innerHTML = html;

    }


    applyPreviewFont();

    updateCounts();
  }


  function applyPreviewFont() {

    const font =
      $("#fontSelect")?.value ||
      "system";


    const fontMap = {

      system:
        '"Segoe UI", Tahoma, Arial, sans-serif',

      serif:
        'Georgia, "Times New Roman", serif',

      sans:
        'Arial, "Segoe UI", sans-serif',

      amiri:
        '"Amiri", "Times New Roman", serif'

    };


    const family =
      fontMap[font] ||
      fontMap.system;


    $("#documentPreview").style.fontFamily =
      family;
  }


  /* =======================================================
     COUNTERS
     ======================================================= */

  function updateCounts() {

    const text =
      getEditorText();


    const characters =
      text.replace(/\s/g, "").length;


    const words =
      text
        ? text.split(/\s+/).filter(Boolean).length
        : 0;


    $("#wordCount").textContent =
      `${words} ${t("words")}`;


    $("#characterCount").textContent =
      `${characters} ${t("characters")}`;
  }


  /* =======================================================
     EDITOR COMMANDS
     ======================================================= */

  function executeEditorCommand(command) {

    const editor = $("#editor");

    if (!editor) return;

    editor.focus();


    if (command === "bold") {

      document.execCommand("bold");

    } else if (command === "italic") {

      document.execCommand("italic");

    } else if (command === "underline") {

      document.execCommand("underline");

    } else if (command === "heading") {

      document.execCommand(
        "formatBlock",
        false,
        "h2"
      );

    } else if (command === "paragraph") {

      document.execCommand(
        "formatBlock",
        false,
        "p"
      );

    } else if (command === "list") {

      document.execCommand(
        "insertUnorderedList"
      );

    } else if (command === "alignRight") {

      document.execCommand(
        "justifyRight"
      );

    } else if (command === "alignCenter") {

      document.execCommand(
        "justifyCenter"
      );

    } else if (command === "alignLeft") {

      document.execCommand(
        "justifyLeft"
      );

    }


    updatePreview();
  }


  /* =======================================================
     RESET
     ======================================================= */

  function resetDocument() {

    const confirmed =
      window.confirm(
        state.language === "ar"
          ? "هل تريد مسح المستند الحالي والبدء من جديد؟"
          : "Clear the current document and start again?"
      );


    if (!confirmed) return;


    prepareNewDocument(
      state.source || "text"
    );


    showToast(
      "success",
      t("resetDone")
    );
  }


  /* =======================================================
     SAVE LOCAL DOCUMENT
     ======================================================= */

  function saveDocumentLocally() {

    const text =
      getEditorText();


    if (!text) {

      showToast(
        "error",
        t("noContent")
      );

      return false;
    }


    const documentData = {

      id:
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .slice(2, 8),

      title:
        $("#documentTitle").value.trim() ||
        t("untitled"),

      type:
        $("#documentType").value,

      content:
        getEditorHTML(),

      text,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()

    };


    state.savedDocuments.unshift(
      documentData
    );


    state.savedDocuments =
      state.savedDocuments.slice(0, 50);


    localStorage.setItem(
      "murattab-documents",
      JSON.stringify(
        state.savedDocuments
      )
    );


    renderSavedDocuments();

    return documentData;
  }


  /* =======================================================
     SAVED DOCUMENTS
     ======================================================= */

  function renderSavedDocuments() {

    const container =
      $("#savedDocuments");


    if (!container) return;


    if (!state.savedDocuments.length) {

      container.innerHTML = `

        <div class="empty-state">

          <div class="empty-icon">
            ◫
          </div>

          <h2>
            ${escapeHTML(
              t("noSavedDocuments")
            )}
          </h2>

          <p>
            ${escapeHTML(
              t("noSavedDescription")
            )}
          </p>

        </div>
      `;

      return;
    }


    container.innerHTML =
      state.savedDocuments.map(doc => `

        <article
          class="saved-card"
          data-id="${escapeHTML(doc.id)}">

          <div class="saved-card-icon">
            ${
              doc.type === "article"
                ? "A"
                : doc.type === "explanation"
                  ? "E"
                  : "D"
            }
          </div>

          <div class="saved-card-body">

            <h3>
              ${escapeHTML(doc.title)}
            </h3>

            <p>
              ${escapeHTML(
                doc.text.slice(0, 120)
              )}${
                doc.text.length > 120
                  ? "..."
                  : ""
              }
            </p>

            <small>
              ${formatDate(doc.updatedAt)}
            </small>

          </div>

          <div class="saved-card-actions">

            <button
              type="button"
              data-action="open"
              data-id="${escapeHTML(doc.id)}">
              فتح
            </button>

            <button
              type="button"
              data-action="delete"
              data-id="${escapeHTML(doc.id)}">
              حذف
            </button>

          </div>

        </article>

      `).join("");
  }


  function formatDate(value) {

    try {

      return new Intl.DateTimeFormat(
        state.language === "ar"
          ? "ar"
          : "en",
        {
          year: "numeric",
          month: "short",
          day: "numeric"
        }
      ).format(new Date(value));

    } catch {

      return "";
    }
  }


  function openSavedDocument(id) {

    const doc =
      state.savedDocuments.find(
        item => item.id === id
      );


    if (!doc) return;


    state.title = doc.title;
    state.type = doc.type;
    state.content = doc.text;


    $("#documentTitle").value =
      doc.title;

    $("#documentType").value =
      doc.type;

    $("#editor").innerHTML =
      doc.content;


    updatePreview();

    openPage("workspace");
  }


  function deleteSavedDocument(id) {

    state.savedDocuments =
      state.savedDocuments.filter(
        item => item.id !== id
      );


    localStorage.setItem(
      "murattab-documents",
      JSON.stringify(
        state.savedDocuments
      )
    );


    renderSavedDocuments();

    showToast(
      "success",
      t("deleted")
    );
  }


  /* =======================================================
     ZOOM
     ======================================================= */

  function updateZoom() {

    const paper =
      $("#documentPreview");


    if (!paper) return;


    paper.style.transform =
      `scale(${state.zoom})`;


    $("#zoomValue").textContent =
      `${Math.round(
        state.zoom * 100
      )}%`;
  }


  function zoomIn() {

    state.zoom =
      Math.min(
        1.25,
        +(state.zoom + 0.05).toFixed(2)
      );

    updateZoom();
  }


  function zoomOut() {

    state.zoom =
      Math.max(
        0.55,
        +(state.zoom - 0.05).toFixed(2)
      );

    updateZoom();
  }


  /* =======================================================
     TOAST
     ======================================================= */

  let toastTimer = null;


  function showToast(type, message) {

    const toast =
      $("#toast");


    if (!toast) return;


    $("#toastMessage").textContent =
      message;


    const icon =
      type === "error"
        ? "!"
        : type === "info"
          ? "i"
          : "✓";


    $("#toastIcon").textContent =
      icon;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
      setTimeout(() => {

        toast.classList.remove(
          "show"
        );

      }, 2800);
  }


  /* =======================================================
     EXPORT MODAL
     ======================================================= */

  function openSaveDialog() {

    if (!getEditorText()) {

      showToast(
        "error",
        t("noContent")
      );

      return;
    }


    openModal("saveModal");
  }


  async function exportDocument(format) {

    if (!getEditorText()) {

      showToast(
        "error",
        t("noContent")
      );

      return;
    }


    closeModal("saveModal");


    if (
      !window.MurattabExporter
    ) {

      showToast(
        "error",
        "Exporter is not available."
      );

      return;
    }


    try {

      await window.MurattabExporter.export({
        format,

        title:
          $("#documentTitle").value.trim() ||
          t("untitled"),

        type:
          $("#documentType").value,

        html:
          getEditorHTML(),

        text:
          getEditorText(),

        language:
          state.language,

        school:
          "مـدرســة شـعــلة النـور",

        previewElement:
          $("#documentPreview")
      });


      showToast(
        "success",
        t("saved")
      );

    } catch (error) {

      console.error(error);

      showToast(
        "error",
        error.message ||
        "Export failed."
      );
    }
  }


  /* =======================================================
     EVENTS
     ======================================================= */

  function bindEvents() {

    /* Navigation */

    $$(".nav-item").forEach(item => {

      item.addEventListener(
        "click",
        () => {
          openPage(item.dataset.page);
        }
      );

    });


    /* Input source cards */

    $$(".input-card").forEach(card => {

      card.addEventListener(
        "click",
        () => {
          selectSource(
            card.dataset.source
          );
        }
      );

    });


    /* File */

    $("#fileInput")
      ?.addEventListener(
        "change",
        event => {

          handleFile(
            event.target.files?.[0]
          );

        }
      );


    /* Image */

    $("#imageInput")
      ?.addEventListener(
        "change",
        event => {

          handleImage(
            event.target.files?.[0]
          );

        }
      );


    /* Editor */

    $("#editor")
      ?.addEventListener(
        "input",
        updatePreview
      );


    $("#documentTitle")
      ?.addEventListener(
        "input",
        updatePreview
      );


    $("#documentType")
      ?.addEventListener(
        "change",
        updatePreview
      );


    $("#fontSelect")
      ?.addEventListener(
        "change",
        () => {

          applyPreviewFont();
          updatePreview();

        }
      );


    /* Toolbar */

    $$(".editor-toolbar button")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            executeEditorCommand(
              button.dataset.command
            );

          }
        );

      });


    /* Save */

    $("#saveDocumentBtn")
      ?.addEventListener(
        "click",
        openSaveDialog
      );


    /* Save formats */

    $$(".export-card")
      .forEach(card => {

        card.addEventListener(
          "click",
          () => {

            exportDocument(
              card.dataset.export
            );

          }
        );

      });


    /* Settings */

    $("#settingsBtn")
      ?.addEventListener(
        "click",
        () => openModal("settingsModal")
      );


    $("#helpBtn")
      ?.addEventListener(
        "click",
        () => openModal("helpModal")
      );


    /* Close buttons */

    $$("[data-close]")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            closeModal(
              button.dataset.close
            );

          }
        );

      });


    /* Close modal by clicking outside */

    $$(".modal-overlay")
      .forEach(overlay => {

        overlay.addEventListener(
          "click",
          event => {

            if (
              event.target === overlay
            ) {

              closeModal(
                overlay.id
              );

            }

          }
        );

      });


    /* Escape */

    document.addEventListener(
      "keydown",
      event => {

        if (event.key === "Escape") {

          closeAllModals();
          closeSidebar();

        }

      }
    );


    /* Mobile sidebar */

    $("#mobileMenuBtn")
      ?.addEventListener(
        "click",
        toggleSidebar
      );


    /* Back */

    $("#backHomeBtn")
      ?.addEventListener(
        "click",
        () => openPage("home")
      );


    /* Reset */

    $("#resetBtn")
      ?.addEventListener(
        "click",
        resetDocument
      );


    /* Language */

    $("#languageSelect")
      ?.addEventListener(
        "change",
        event => {

          state.language =
            event.target.value;

          localStorage.setItem(
            "murattab-language",
            state.language
          );

          applyTranslations();
          updatePreview();
          renderSavedDocuments();

        }
      );


    /* Theme */

    $("#themeSelect")
      ?.addEventListener(
        "change",
        event => {

          state.theme =
            event.target.value;

          applyTheme();

        }
      );


    /* Zoom */

    $("#zoomInBtn")
      ?.addEventListener(
        "click",
        zoomIn
      );


    $("#zoomOutBtn")
      ?.addEventListener(
        "click",
        zoomOut
      );


    /* Saved documents */

    $("#savedDocuments")
      ?.addEventListener(
        "click",
        event => {

          const button =
            event.target.closest(
              "[data-action]"
            );

          if (!button) return;


          const id =
            button.dataset.id;


          if (
            button.dataset.action ===
            "open"
          ) {

            openSavedDocument(id);

          }


          if (
            button.dataset.action ===
            "delete"
          ) {

            deleteSavedDocument(id);

          }

        }
      );


    /* Ctrl/Cmd + S */

    document.addEventListener(
      "keydown",
      event => {

        if (
          (event.ctrlKey ||
            event.metaKey) &&
          event.key.toLowerCase() === "s"
        ) {

          event.preventDefault();

          openSaveDialog();

        }

      }
    );

  }


  /* =======================================================
     INITIALIZATION
     ======================================================= */

  function init() {

    applyTheme();

    applyTranslations();

    bindEvents();

    renderSavedDocuments();

    updatePreview();

    updateZoom();

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.MurattabApp = {

    state,

    t,

    updatePreview,

    showToast,

    getEditorHTML,

    getEditorText

  };

})();