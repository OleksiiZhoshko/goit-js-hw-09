const refs = {
    startButtonShengeColor: document.querySelector('[data-start]'),
    stopButtonShengeColor: document.querySelector('[data-stop]'),
    bodyRef: document.body
};

refs.startButtonShengeColor.addEventListener('click', onSwitcher);
refs.stopButtonShengeColor.addEventListener('click', offSwitcher);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let setId = null;
let activeBtn = true;


function onSwitcher() {
    if (activeBtn) {
        setId = setInterval(() => {
            refs.bodyRef.style.backgroundColor = `${getRandomHexColor()}`
        }, 1000);
        refs.startButtonShengeColor.setAttribute('offBtn', true);
    }
    activeBtn = false;
}

function offSwitcher() {
  clearInterval(setId);
  if (!activeBtn) {
    refs.startButtonShengeColor.removeAttribute('disabled', true);
  }
  activeBtn = true;
}
