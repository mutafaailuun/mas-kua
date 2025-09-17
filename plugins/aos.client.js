// plugins/aos.client.js
export default defineNuxtPlugin(() => {
  if (process.client) {
    // Simple animation observer for fade-in effects
    const observeElements = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animated");
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      elements.forEach((element) => {
        observer.observe(element);
      });
    };

    // Run after page load
    window.addEventListener("load", observeElements);
  }
});
