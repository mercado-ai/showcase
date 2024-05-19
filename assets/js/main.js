/* const load_template = async (url, container_id) => {
  const response = await fetch(url)
  const text = await response.text()
  const template = document.createElement('template')
  template.innerHTML = text.trim()
  const content = template.content.cloneNode(true)
  document.getElementById(container_id).appendChild(content)
}

// Load header and footer templates
document.addEventListener('DOMContentLoaded', () => {
  load_template('components/masthead.html', 'masthead-template')
}) */

const set_copyright = () => {
  const copyright_year_el = document.querySelector('#copyright-year')
  const current_year = new Date().getFullYear()
  copyright_year_el.textContent = current_year
}

const observe_mc_sections = () => {
  const logo_text = document.querySelector('#mercado-logo-text-tmpl')
  const logo_brandmark = document.querySelector('#mercado-logo-brandmark-tmpl')

  const mc_section_els = document.querySelectorAll('.mc-section')

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const {
        target,
        isIntersecting,
        intersectionRatio,
        boundingClientRect,
      } = entry
      console.log('entry', target, boundingClientRect.top)

      if (
        boundingClientRect.top > 0 &&
        intersectionRatio >= 0.3 &&
        !target.classList.contains('mc-visible')
      ) {
        target.classList.add('mc-visible')
      }

      if (
        boundingClientRect.top > 0 &&
        intersectionRatio <= 0.3 &&
        target.classList.contains('mc-visible')
      ) {
        target.classList.remove('mc-visible')
      }

      if (
        boundingClientRect.top > 0 &&
        target.classList.contains('mc-change-theme')
      ) {
        document.body.classList.add('mc-theme-transition')

        if (intersectionRatio >= 0.5) {
          document.body.classList.remove('mc-theme-1')
          document.body.classList.add('mc-theme-2')
        } else {
          document.body.classList.remove('mc-theme-2')
          document.body.classList.add('mc-theme-1')
        }
      }

      // Handles page reloads where the user has already scrolled
      if (
        boundingClientRect.top <= 0 &&
        !target.classList.contains('mc-visible')
      ) {
        target.classList.add('mc-visible')
      }

      if (
        boundingClientRect.top <= 0 &&
        target.classList.contains('mc-change-theme')
      ) {
        document.body.classList.remove('mc-theme-1')
        document.body.classList.add('mc-theme-2')
      }
    })
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  }

  const observer = new IntersectionObserver(callback, options)

  mc_section_els.forEach((mc_section_el) => {
    observer.observe(mc_section_el)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  set_copyright()

  observe_mc_sections()
})
