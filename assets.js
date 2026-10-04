/* =========================================================
   مُرَتَّب — ASSETS & UTILITIES
   أدوات مشتركة للمشروع
   ========================================================= */

(function () {
  "use strict";

  const Assets = {};

  /* ---------------------------------------------------------
     معلومات التطبيق
  --------------------------------------------------------- */

  Assets.app = {
    name: "مُرَتَّب",
    englishName: "Murattab",
    version: "1.0.0",
    school: "مـدرســة شـعــلة النـور"
  };

  /* ---------------------------------------------------------
     أيقونات SVG جاهزة
  --------------------------------------------------------- */

  Assets.icons = {

    document: `
      <svg viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3.5h8l4 4V20.5H6V3.5Z"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linejoin="round"/>
        <path d="M14 3.5v4h4"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linejoin="round"/>
        <path d="M9 12h6M9 15.5h6"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"/>
      </svg>
    `,

    file: `
      <svg viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M7 3.5h7l3 3v14H7V3.5Z"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linejoin="round"/>
        <path d="M14 3.5v4h3"
          stroke="currentColor"
          stroke-width="1.8"/>
      </svg>
    `,

    image: `
      <svg viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect x="3.5" y="4.5"
          width="17"
          height="15"
          rx="2"
          stroke="currentColor"
          stroke-width="1.8"/>
        <circle cx="8.5" cy="9"
          r="1.5"
          stroke="currentColor"
          stroke-width="1.5"/>
        <path d="m5.5 17 4.5-4 3 2.5 2-2 3.5 3.5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"/>
      </svg>
    `,

    text: `
      <svg viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M5 4h14M12 4v16M8 20h8"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"/>
      </svg>
    `,

    download: `
      <svg viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3v11"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"/>
        <path d="m7.5 10 4.5 4.5 4.5-4.5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"/>
        <path d="M5 20h14"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"/>
      </svg>
    `,

    pdf: `
      <svg viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3.5h8l4 4V20.5H6V3.5Z"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linejoin="round"/>
        <path d="M14 3.5v4h4"
          stroke="currentColor"
          stroke-width="1.8"/>
        <path d="M8.5 15.5h2.5M8.5 12.5h4"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"/>
      </svg>
    `,

    settings: `
      <svg viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12"
          r="3"
          stroke="currentColor"
          stroke-width="1.8"/>
        <path d="M19 13.5v-3l-2-.6a7 7 0 0 0-.7-1.6l.9-1.9-2.1-2.1-1.9.9a7 7 0 0 0-1.6-.7L11 2.5H8l-.6 2a7 7 0 0 0-1.6.7l-1.9-.9-2.1 2.1.9 1.9a7 7 0 0 0-.7 1.6l-2 .6v3l2 .6c.2.6.4 1.1.7 1.6l-.9 1.9 2.1 2.1 1.9-.9c.5.3 1 .5 1.6.7l.6 2h3l.6-2c.6-.2 1.1-.4 1.6-.7l1.9.9 2.1-2.1-.9-1.9c.3-.5.5-1 .7-1.6l2-.6Z"
          stroke="currentColor"
          stroke-width="1.3"
          stroke-linejoin="round"/>
      </svg>
    `,

    plus: `
      <svg viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5v14M5 12h14"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"/>
      </svg>
    `,

    close: `
      <svg viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"/>
      </svg>
    `,

    check: `
      <svg viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m5 12.5 4.2 4L19 7"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"/>
      </svg>
    `

  };

  /* ---------------------------------------------------------
     إضافة أيقونة
  --------------------------------------------------------- */

  Assets.icon = function (name, className = "") {
    const svg = Assets.icons[name];

    if (!svg) return "";

    return `
      <span class="murattab-icon ${className}">
        ${svg}
      </span>
    `;
  };

  /* ---------------------------------------------------------
     إنشاء معرفات
  --------------------------------------------------------- */

  Assets.uid = function (prefix = "id") {
    return (
      prefix +
      "-" +
      Date.now().toString(36) +
      "-" +
      Math.random()
        .toString(36)
        .slice(2, 8)
    );
  };

  /* ---------------------------------------------------------
     تنسيق التاريخ
  --------------------------------------------------------- */

  Assets.formatDate = function (
    date = new Date(),
    language = "ar"
  ) {
    try {
      return new Intl.DateTimeFormat(
        language === "en"
          ? "en-US"
          : "ar-EG",
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      ).format(new Date(date));
    } catch {
      return new Date(date).toLocaleDateString();
    }
  };

  /* ---------------------------------------------------------
     تنظيف النص
  --------------------------------------------------------- */

  Assets.cleanText = function (text) {
    return String(text || "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  /* ---------------------------------------------------------
     حساب الكلمات والحروف
  --------------------------------------------------------- */

  Assets.countWords = function (text) {
    const clean = Assets.cleanText(text);

    if (!clean) return 0;

    return clean
      .split(/\s+/)
      .filter(Boolean)
      .length;
  };

  Assets.countCharacters = function (text) {
    return String(text || "")
      .replace(/\s/g, "")
      .length;
  };

  /* ---------------------------------------------------------
     نسخ النص
  --------------------------------------------------------- */

  Assets.copyText = async function (text) {
    try {
      if (
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      const area =
        document.createElement("textarea");

      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";

      document.body.appendChild(area);

      area.select();

      const result =
        document.execCommand("copy");

      area.remove();

      return result;

    } catch {
      return false;
    }
  };

  /* ---------------------------------------------------------
     تحميل ملف كنص
  --------------------------------------------------------- */

  Assets.readTextFile = function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () =>
        resolve(reader.result || "");

      reader.onerror = () =>
        reject(reader.error);

      reader.readAsText(file, "UTF-8");
    });
  };

  /* ---------------------------------------------------------
     تحويل HTML إلى نص
  --------------------------------------------------------- */

  Assets.htmlToText = function (html) {
    const element =
      document.createElement("div");

    element.innerHTML = html || "";

    return Assets.cleanText(
      element.innerText ||
      element.textContent ||
      ""
    );
  };

  /* ---------------------------------------------------------
     تخزين آمن
  --------------------------------------------------------- */

  Assets.storage = {

    set(key, value) {
      try {
        localStorage.setItem(
          key,
          JSON.stringify(value)
        );

        return true;
      } catch {
        return false;
      }
    },

    get(key, fallback = null) {
      try {
        const value =
          localStorage.getItem(key);

        return value === null
          ? fallback
          : JSON.parse(value);

      } catch {
        return fallback;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    }

  };

  /* ---------------------------------------------------------
     منع إدخال HTML خطير من المصادر الخارجية
  --------------------------------------------------------- */

  Assets.sanitizeHTML = function (html) {
    const template =
      document.createElement("template");

    template.innerHTML = html || "";

    const forbidden = template.content.querySelectorAll(
      "script, iframe, object, embed, form, link, meta"
    );

    forbidden.forEach(element => {
      element.remove();
    });

    template.content
      .querySelectorAll("*")
      .forEach(element => {

        [...element.attributes].forEach(attr => {

          const name =
            attr.name.toLowerCase();

          const value =
            attr.value.toLowerCase();

          if (
            name.startsWith("on") ||
            value.includes("javascript:")
          ) {
            element.removeAttribute(attr.name);
          }

        });

      });

    return template.innerHTML;
  };

  /* ---------------------------------------------------------
     تجهيز الطباعة
  --------------------------------------------------------- */

  Assets.printStyles = function () {
    return `
      @page {
        size: A4;
        margin: 18mm;
      }

      @media print {

        body {
          background: #ffffff !important;
        }

        .murattab-no-print {
          display: none !important;
        }

        .murattab-print-document {
          display: block !important;
        }

      }
    `;
  };

  /* ---------------------------------------------------------
     إضافة أنماط الطباعة عند الحاجة
  --------------------------------------------------------- */

  Assets.installPrintStyles = function () {
    if (
      document.getElementById(
        "murattab-print-styles"
      )
    ) {
      return;
    }

    const style =
      document.createElement("style");

    style.id =
      "murattab-print-styles";

    style.textContent =
      Assets.printStyles();

    document.head.appendChild(style);
  };

  /* ---------------------------------------------------------
     واجهة مساعدة لإنشاء عنصر
  --------------------------------------------------------- */

  Assets.create = function (
    tag,
    className = "",
    content = ""
  ) {
    const element =
      document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (content) {
      element.innerHTML = content;
    }

    return element;
  };

  /* ---------------------------------------------------------
     تفعيل الأدوات
  --------------------------------------------------------- */

  Assets.init = function () {
    Assets.installPrintStyles();
  };

  window.MurattabAssets = Assets;

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      Assets.init
    );
  } else {
    Assets.init();
  }

})();