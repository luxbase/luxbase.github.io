(function () {
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector("#primary-nav");
    if (toggle && nav) {
      const setOpen = (open) => {
        header.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      };
      toggle.addEventListener("click", () => setOpen(!header.classList.contains("nav-open")));
      nav.querySelectorAll("a").forEach((link) =>
        link.addEventListener("click", () => setOpen(false))
      );
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
      });
      document.addEventListener("click", (event) => {
        if (header.classList.contains("nav-open") && !header.contains(event.target)) {
          setOpen(false);
        }
      });
    }
  }
})();

(function () {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  if (!form || !status) {
    return;
  }

  const accessKey = window.LUXBASE_WEB3FORMS_KEY;

  if (!accessKey || accessKey === "YOUR_WEB3FORMS_KEY") {
    status.textContent = "Add NEXT_PUBLIC_WEB3FORMS_KEY to .env and generate web3forms-config.js before publishing.";
    form.querySelector("button").disabled = true;
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending...";

    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("subject", "New LuxbaseDev website inquiry");
    formData.append("from_name", "LuxbaseDev Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Message failed.");
      }

      form.reset();
      status.textContent = "Message sent. We will get back to you soon.";
    } catch (error) {
      status.textContent = "Could not send the message. Please try again.";
    }
  });
})();
