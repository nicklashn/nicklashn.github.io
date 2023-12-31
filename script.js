document.addEventListener("DOMContentLoaded", (event) => {
    // Dark mode switch
    if (!localStorage.getItem('mode')) {
        document.body.classList.add("dark-mode");
        localStorage.setItem('mode', 'dark');
        document.getElementById('darkMode').checked = true;
    }

    const darkModeSwitch = document.querySelector('#darkMode');
    darkModeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');

        if (localStorage.getItem('mode') === 'dark') {
            localStorage.setItem('mode', 'light');
        } else {
            localStorage.setItem('mode', 'dark');
        }
    });

    var tooltip = document.getElementById('tooltip');
    var expandButtons = document.querySelectorAll('.expand-button');
    var closeTooltip = document.getElementById('closeTooltip');
    var tooltipTimer = null;
    var expandClicked = false;

    expandButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const expandable = event.target.nextSibling.nextSibling;
            if (expandable.style.display === 'none' || expandable.style.display === '') {
                expandable.style.display = 'block';
                event.target.innerText = '-';
                event.target.style.backgroundColor = "#008CBA";
                event.target.style.color = "white";
            } else {
                expandable.style.display = 'none';
                event.target.innerText = '?';
                event.target.style.backgroundColor = "#008CBA";
                event.target.style.color = "white";
            }
            expandClicked = true;
        });
    });

    window.addEventListener('scroll', function () {
        if (expandClicked) return;

        for (var i = 0; i < expandButtons.length; i++) {
            var bounding = expandButtons[i].getBoundingClientRect();
            if (
                bounding.top >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            ) {
                if (tooltipTimer) {
                    clearTimeout(tooltipTimer);
                }
                tooltipTimer = setTimeout(function () {
                    tooltip.classList.add('visible');
                }, 5000);
                break;
            } else {
                if (tooltipTimer) {
                    clearTimeout(tooltipTimer);
                }
                tooltip.classList.remove('visible');
            }
        }
    });

    closeTooltip.addEventListener('click', function () {
        if (tooltipTimer) {
            clearTimeout(tooltipTimer);
        }
        tooltip.classList.remove('visible');
    });
});
const languageSwitch = document.querySelector('#languageSwitch');
const englishElements = document.querySelectorAll('.english');
const danishElements = document.querySelectorAll('.danish');

languageSwitch.addEventListener('change', () => {
    englishElements.forEach(el => {
        el.style.display = el.style.display === 'none' ? '' : 'none';
    });

    danishElements.forEach(el => {
        el.style.display = el.style.display === 'none' ? '' : 'none';
    });

    if (localStorage.getItem('lang') === 'EN') {
        localStorage.setItem('lang', 'DK');
    } else {
        localStorage.setItem('lang', 'EN');
    }
});

// Apply language from localStorage when page is loaded
if (localStorage.getItem('lang') === 'DK') {
    englishElements.forEach(el => {
        el.style.display = '';
    });

    danishElements.forEach(el => {
        el.style.display = 'none';
    });
    languageSwitch.checked = true;
} else {
    englishElements.forEach(el => {
        el.style.display = 'none';
    });

    danishElements.forEach(el => {
        el.style.display = '';
    });
    languageSwitch.checked = false;
}

function openCase(caseNumber) {
    // Hide all cases
    var cases = document.getElementsByClassName('case');
    for (var i = 0; i < cases.length; i++) {
        cases[i].style.display = 'none';
    }

    // Show the selected case
    document.getElementById('expandedCase' + caseNumber).style.display = 'block';
}

function closeCase(caseNumber) {
    // Hide the selected case
    document.getElementById('expandedCase' + caseNumber).style.display = 'none';

    // Show all cases
    var cases = document.getElementsByClassName('case');
    for (var i = 0; i < cases.length; i++) {
        cases[i].style.display = 'block';
    }
}

var currentOpenCase = null;

function openCase(caseNumber) {
    // Close the currently open case if one is open
    if (currentOpenCase != null) {
        closeCase(currentOpenCase);
    }

    document.getElementById('case' + caseNumber).classList.remove('dim'); // restore the chosen case
    for(let i = 1; i <= 4; i++){
        if(i != caseNumber){
            document.getElementById('case' + i).classList.add('dim'); // dim the other cases
        }
    }
    document.getElementById('expandedCase' + caseNumber).style.display = 'block'; // show the expanded case
    currentOpenCase = caseNumber; // update the currently open case
}

function closeCase(caseNumber) {
    for(let i = 1; i <= 4; i++){
        document.getElementById('case' + i).classList.remove('dim'); // restore all cases
    }
    document.getElementById('expandedCase' + caseNumber).style.display = 'none'; // hide the expanded case
    currentOpenCase = null; // update the currently open case
}

