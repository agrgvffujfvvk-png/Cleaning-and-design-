/* =========================================================
   مُرَتَّب — EXPORTER
   تصدير المستند كملف TXT / PDF / PNG / JPG
   ========================================================= */

(function () {
  "use strict";

  const Exporter = {};

  /* ---------------------------------------------------------
     تحميل مكتبة خارجية عند الحاجة
  --------------------------------------------------------- */

  function loadScript(src, id) {
    return new Promise((resolve, reject) => {
      if (id && document.getElementById(id)) {
        resolve();
        return;
      }

      const script = document.createElement("script");

      if (id) script.id = id;

      script.src = src;
      script.async = true;

      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("تعذر تحميل مكتبة التصدير"));

      document.head.appendChild(script);
    });
  }

  async function ensureHtml2Canvas() {
    if (window.html2canvas) return;

    await loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
      "murattab-html2canvas"
    );
  }

  async function ensureJsPDF() {
    if (window.jspdf && window.jspdf.jsPDF) return;

    await loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
      "murattab-jspdf"
    );
  }

  /* ---------------------------------------------------------
     أدوات عامة
  --------------------------------------------------------- */

  function safeFilename(name) {
    name = String(name || "مستند مرتب")
      .replace(/[\\/:*?"<>|]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    return name || "مستند مرتب";
  }

  function escapeHTML(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function htmlToText(html) {
    const temp = document.createElement("div");
    temp.innerHTML = html || "";

    return (temp.innerText || temp.textContent || "")
      .replace(/\u00a0/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function notify(message, type = "success") {
    if (window.MurattabApp && typeof window.MurattabApp.toast === "function") {
      window.MurattabApp.toast(message, type);
      return;
    }

    alert(message);
  }

  /* ---------------------------------------------------------
     بناء نسخة التصدير
  --------------------------------------------------------- */

  function createExportDocument(data) {
    const title = escapeHTML(data.title || "مستند بدون عنوان");
    const type = escapeHTML(data.type || "مستند");
    const content = data.html || "";
    const school = escapeHTML(
      data.school || "مـدرســة شـعــلة النـور"
    );

    const direction = data.language === "en" ? "ltr" : "rtl";

    const wrapper = document.createElement("div");

    wrapper.className = "murattab-export-page";

    wrapper.setAttribute("dir", direction);

    wrapper.style.position = "fixed";
    wrapper.style.left = "-100000px";
    wrapper.style.top = "0";
    wrapper.style.width = "794px";
    wrapper.style.minHeight = "1123px";
    wrapper.style.background = "#ffffff";
    wrapper.style.color = "#172033";
    wrapper.style.padding = "70px 65px 65px";
    wrapper.style.boxSizing = "border-box";
    wrapper.style.fontFamily =
      "'Arial', 'Tahoma', sans-serif";
    wrapper.style.zIndex = "-9999";

    wrapper.innerHTML = `
      <div style="
        min-height:970px;
        display:flex;
        flex-direction:column;
      ">

        <div style="
          text-align:center;
          padding-bottom:28px;
          margin-bottom:30px;
          border-bottom:1px solid #d9dee8;
        ">

          <div style="
            font-size:15px;
            font-weight:600;
            color:#667085;
            margin-bottom:12px;
          ">
            ${type}
          </div>

          <h1 style="
            margin:0;
            font-size:34px;
            line-height:1.35;
            font-weight:800;
            color:#111827;
          ">
            ${title}
          </h1>

        </div>

        <article style="
          flex:1;
          font-size:20px;
          line-height:2;
          text-align:justify;
          word-break:break-word;
        ">
          ${content}
        </article>

        <footer style="
          margin-top:45px;
          padding-top:18px;
          border-top:1px solid #e2e6ee;
          text-align:center;
          font-size:13px;
          color:#667085;
        ">
          ${school}
        </footer>

      </div>
    `;

    document.body.appendChild(wrapper);

    return wrapper;
  }

  /* ---------------------------------------------------------
     TXT
  --------------------------------------------------------- */

  function exportTXT(data) {
    const text = [
      data.title || "مستند بدون عنوان",
      "",
      data.type || "مستند",
      "",
      data.text || htmlToText(data.html),
      "",
      "--------------------------------",
      data.school || "مـدرســة شـعــلة النـور"
    ].join("\n");

    const blob = new Blob(
      [text],
      {
        type: "text/plain;charset=utf-8"
      }
    );

    downloadBlob(
      blob,
      safeFilename(data.title) + ".txt"
    );

    notify("تم حفظ الملف بنجاح");
  }

  /* ---------------------------------------------------------
     PDF
  --------------------------------------------------------- */

  async function exportPDF(data) {
    notify("جاري تجهيز ملف PDF...", "info");

    await ensureHtml2Canvas();
    await ensureJsPDF();

    const page = createExportDocument(data);

    await new Promise(resolve => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(resolve);
      } else {
        resolve();
      }
    });

    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false
    });

    page.remove();

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true
    });

    const pageWidth = 210;
    const pageHeight = 297;

    const imageWidth = pageWidth;
    const imageHeight =
      canvas.height * imageWidth / canvas.width;

    let remainingHeight = imageHeight;
    let position = 0;

    const imageData = canvas.toDataURL(
      "image/jpeg",
      0.95
    );

    pdf.addImage(
      imageData,
      "JPEG",
      0,
      position,
      imageWidth,
      imageHeight
    );

    remainingHeight -= pageHeight;

    while (remainingHeight > 0) {
      position = remainingHeight - imageHeight;

      pdf.addPage();

      pdf.addImage(
        imageData,
        "JPEG",
        0,
        position,
        imageWidth,
        imageHeight
      );

      remainingHeight -= pageHeight;
    }

    pdf.save(
      safeFilename(data.title) + ".pdf"
    );

    notify("تم إنشاء ملف PDF بنجاح");
  }

  /* ---------------------------------------------------------
     الصور
  --------------------------------------------------------- */

  async function exportImage(data, extension = "png") {
    notify("جاري تجهيز الصورة...", "info");

    await ensureHtml2Canvas();

    const page = createExportDocument(data);

    await new Promise(resolve => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });

    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false
    });

    page.remove();

    const mime =
      extension === "jpg"
        ? "image/jpeg"
        : "image/png";

    canvas.toBlob(
      blob => {
        if (!blob) {
          notify("تعذر إنشاء الصورة", "error");
          return;
        }

        downloadBlob(
          blob,
          safeFilename(data.title) +
            "." +
            extension
        );

        notify("تم حفظ الصورة بنجاح");
      },
      mime,
      extension === "jpg" ? 0.95 : undefined
    );
  }

  /* ---------------------------------------------------------
     تنزيل Blob
  --------------------------------------------------------- */

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  /* ---------------------------------------------------------
     نقطة التصدير الرئيسية
  --------------------------------------------------------- */

  Exporter.export = async function (data) {
    try {
      if (!data) {
        notify("لا يوجد مستند للتصدير", "error");
        return;
      }

      const format = String(
        data.format || "txt"
      ).toLowerCase();

      if (format === "txt" || format === "file") {
        exportTXT(data);
        return;
      }

      if (format === "pdf") {
        await exportPDF(data);
        return;
      }

      if (format === "png" || format === "image") {
        await exportImage(data, "png");
        return;
      }

      if (format === "jpg" || format === "jpeg") {
        await exportImage(data, "jpg");
        return;
      }

      notify(
        "صيغة التصدير غير مدعومة",
        "error"
      );

    } catch (error) {
      console.error(
        "Murattab Export Error:",
        error
      );

      notify(
        "حدث خطأ أثناء التصدير. حاول مرة أخرى.",
        "error"
      );
    }
  };

  window.MurattabExporter = Exporter;

})();