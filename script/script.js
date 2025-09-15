function loader() {
  const loader = document.querySelector('.loader');
  const loaderAni = document.querySelector('.loader h1');

  setTimeout(() => {
    loaderAni.style.marginBottom = '0'
  }, 800)

  if (!sessionStorage.getItem('loaderShown')) {
    setTimeout(() => {
      loader.style.marginTop = '-210%';
      sessionStorage.setItem('loaderShown', 'true');
    }, 2000);
  } else {
    loader.style.display = 'none';
  }
}

window.addEventListener('load', loader);

function menu() {
  const menu = document.querySelector('.menu');
  const extendedMenu = document.querySelector('.extended-menu');
  const menuBar = document.querySelectorAll('.menu .bar');
  let isOpen = false;

  const toggleMenu = () => {
    extendedMenu.style.bottom = isOpen ? '-50vh' : '0vh';
    extendedMenu.style.opacity = isOpen ? '.8' : '1';
    menuBar.forEach(bar => bar.style.backgroundColor = isOpen ? '' : '#2462EB');
    isOpen = !isOpen;
  }

  menu.addEventListener('click', e => {
    e.stopPropagation()
    toggleMenu()
  })

  document.addEventListener('click', e => {
    if (isOpen && !menu.contains(e.target) && !extendedMenu.contains(e.target)) toggleMenu()
  })
}

function logSing() {
  const popUpCross = document.querySelector('.cross');
  const loginSignup = document.querySelector('.login-signup');

  if (!sessionStorage.getItem('popupShown')) {
    loginSignup.style.top = '20vh';
    sessionStorage.setItem('popupShown', 'true');
  } else {
    loginSignup.style.display = 'none'
  }

  popUpCross.addEventListener('click', () => {
    loginSignup.style.top = '-30vh';
  });
}



loader()
menu()
logSing()




