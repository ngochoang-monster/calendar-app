const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var date = new Date();
var month_current = date.getMonth();
var year_current = date.getFullYear();
const calendar = $('.calendar');

const App = {
    monthData: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ],

    render() {

        // Render 
        var yearElement = $('.title-year');
        var monthElement = $('.title-month');
        yearElement.innerText = year_current
        monthElement.innerText = this.monthData[month_current]

        // Handle day of month
        const firstDay = new Date(year_current, month_current + 1, 1).getDate();
        const lastDay = new Date(year_current, month_current + 1, 0).getDate();
        const dayOfWeek = new Date(year_current, month_current, 1).toDateString().slice(0, 3);
        const output = [];
        var emptyDate = [
            '<div class="box-day"><span></span></div>',
            '<div class="box-day"><span></span></div>',
            '<div class="box-day"><span></span></div>',
            '<div class="box-day"><span></span></div>',
            '<div class="box-day"><span></span></div>',
            '<div class="box-day"><span></span></div>',
        ];
        // Loop getDate
        const calendarElement = $('.calendar')
        for (var i = firstDay; i <= lastDay; i++) {
            var result = [`<div class="box-day"><span>${i}</span></div>`]
            output.push(result)
        }
        // Change line
        (change = () => {
            if ((dayOfWeek === 'Sat' && lastDay === 30)
                || (dayOfWeek === 'Sun' && lastDay === 28)
                || (dayOfWeek === 'Sun' && lastDay === 29)
                || (dayOfWeek === 'Sat' && lastDay === 28)
                || (dayOfWeek === 'Sat' && lastDay === 29)) {
                calendar.style.gridTemplateRows = '52px 52px 52px 52px 52px';
            } else if ((dayOfWeek === 'Sat' || dayOfWeek === 'Sun')
                || (dayOfWeek === 'Sun' && lastDay === 30)) {
                calendar.style.gridTemplateRows = '52px 52px 52px 52px 52px 52px';
            } else if (dayOfWeek === 'Mon' && lastDay === 28) {
                calendar.style.gridTemplateRows = '52px 52px 52px 52px';
            } else {
                calendar.style.gridTemplateRows = '52px 52px 52px 52px 52px';
            }
        })();
        (function handleDate() {
            switch (dayOfWeek) {
                case 'Mon':
                    return emptyDate = [];
                case 'Tue':
                    return emptyDate = emptyDate.slice(0, 1);
                case 'Wed':
                    return emptyDate = emptyDate.slice(0, 2);
                case 'Thu':
                    return emptyDate = emptyDate.slice(0, 3);
                case 'Fri':
                    return emptyDate = emptyDate.slice(0, 4);
                case 'Sat':
                    return emptyDate = emptyDate.slice(0, 5);
                case 'Sun':
                    return emptyDate = emptyDate.slice(0, 6);
                default:
                    return []
            }
        })()
        result = [...emptyDate, ...output]
        calendarElement.innerHTML = result.join('')
        // Hiden element emty
        const boxDay = $$('.box-day span')
        boxDay.forEach(element => {
            if (element.textContent === '') {
                element.closest('.box-day').style.visibility = 'hidden'
            }
        })
    },


    handleEvent() {
        const nextMonth = $('.month .arrow-right');
        const preMonth = $('.month .arrow-left');

        nextMonth.addEventListener('click', () => {
            if (month_current > 10) {
                month_current = -1
                year_current++
            }
            month_current = month_current + 1
            this.render()
        })

        preMonth.addEventListener('click', () => {
            if (month_current < 1) {
                month_current = 12
                year_current--
            }
            month_current = month_current - 1
            this.render()
        })
    },

    chooseYear() {
        const titleYear = $('.title-year');
        const elementInputYear = $('.year-input');

        titleYear.addEventListener('dblclick', () => {
            elementInputYear.value = year_current
            titleYear.classList.add('editing')
            elementInputYear.classList.add('active')
        })
        handleValueChange = (num) => {
            if (num) {
                year_current = num
                titleYear.classList.remove('editing')
                elementInputYear.classList.remove('active')
                this.render()
            } else {
                titleYear.classList.remove('editing')
                elementInputYear.classList.remove('active')
                this.render()
            }
        }
        elementInputYear.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                handleValueChange(elementInputYear.value)
            }
        })
        elementInputYear.addEventListener('blur', () => {
            handleValueChange(elementInputYear.value)
        })
    },


    start() {
        this.render()
        this.handleEvent()
        this.chooseYear()
    }
}

App.start()