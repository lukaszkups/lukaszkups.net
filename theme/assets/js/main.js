console.info('Hello!');

// Update current year dates automatically 😎
const updateYears = () => {
  const nodes = document.querySelectorAll('.lk-update-year');
  const year = new Date().getFullYear();
  nodes.forEach((item) => {
    item.innerHTML = year;
  });
}
updateYears();

// Calculate how much time has passed since [data-since-year] value 👨‍💻
const calculateTimespan = () => {
  const nodes = document.querySelectorAll('.lk-calculate-timespan');
  const year = new Date().getFullYear();
  nodes.forEach((item) => {
    item.innerText = year - parseInt(item.getAttribute("data-since-year"));
  });
}
calculateTimespan();

// "shiny" light effect
const shinyNode = document.querySelector(".lk-shiny");
if (shinyNode) {
  shinyNode.addEventListener("mousemove", (e) => {
    const { x, y } = shinyNode.getBoundingClientRect();
    shinyNode.style.setProperty("--x", e.clientX - x);
    shinyNode.style.setProperty("--y", e.clientY - y);
  });
}

// Background Particle effect
const particleJsConfig = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#1c2029' },
    shape: {
      type: 'circle',
      stroke: { width: 0, color: '#1c2029' },
      polygon: { nb_sides: 7 },
      image: { src: 'img/github.svg', width: 100, height: 100 },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#1c2029',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: false, mode: 'repulse' },
      onclick: { enable: false, mode: 'push' },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 100, size: 3, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
};

const getParticleConfig = (config) => {
  let configObj = particleJsConfig;
  if (config.color) {
    configObj.particles.color.value = config.color;
    configObj.particles.shape.color = config.color;
    configObj.particles.line_linked.color = config.color;
  }
  return configObj;
}

if (document.getElementById('particles-js')) {
  particlesJS("particles-js", getParticleConfig({ color: '#1c2029' }));
}

if (document.getElementById('particles-js--gold')) {
  particlesJS("particles-js--gold", getParticleConfig({ color: '#ecbd29' }));
}

if (document.getElementById('particles-js--exp')) {
  particlesJS("particles-js--exp", getParticleConfig({ color: '#ecbd29' }));
}

// code syntax highlight
hljs.highlightAll();

// search-related stuff

const renderArticle = (article) => {
  return `
    <a class="cube article-item" href="${article.url}">
      <div class="flippety">
        <h2>${article?.meta?.title || JSON.stringify(article)} - ${article?.meta?.date}</h2>
      </div>
      <div class="flop">
        <h2>${article?.meta?.title || JSON.stringify(article)} - ${article?.meta?.date}</h2>
      </div>
    </a>
  `
}

const filterNotesByCategory = (category, list) => {
  const notesWrapper = document.getElementById('notes-list');
  notesWrapper.innerHTML = `${list.filter((entry) => entry?.meta?.category.includes(category)).map((entry) => renderArticle(entry)).join('')}`;
}

const filterNotesByTag = (tag, list) => {
  const notesWrapper = document.getElementById('notes-list');
  notesWrapper.innerHTML = `${list.filter((entry) => entry?.meta?.tags.includes(tag)).map(entry => renderArticle(entry)).join('')}`;
}

// notes filtering
if (location.pathname.includes('/notes/')) {
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const tag = params.get('tag');
  // get full entry list if needed
  if ((category !== null && category.length) || (tag !== null && tag.length)) {
    fetch('/notes/search.json').then(resp => resp.json()).then((resp) => {
      const entryList = resp && resp.data && resp.data.length ? resp.data : [];
      // remove current notes entry, calendars and hide pagination
      const notesWrapper = document.getElementById('notes-list');
      if (notesWrapper) {
        notesWrapper.innerHTML = '';
      }
      // handle filtering
      if (category !== null && category.length) {
        filterNotesByCategory(category.toLowerCase(), entryList);
      } else if (tag !== null && tag.length) {
        filterNotesByTag(tag.toLowerCase(), entryList);
      }
    }).catch(err => {
      throw new Error(err);
    })
  }
}

// Comment section activation

const commentsBtn = document.getElementById('show-comment-button');
if (commentsBtn) {
  commentsBtn.addEventListener('click', () => {
    const commentSection = document.getElementById('comment-section');
    if (commentSection) {
      commentBox('5702030953807872-proj');
    }
    commentsBtn.remove();
  });
}

