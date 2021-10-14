/* Вопросы */
let questions = [ "Сколько людей работает в вашей компании?",
				"Есть ли у вашего бренда профили в социальных сетях?",
				"В каких социальных сетях вы присутствуете?"
				]

/* Ответы */
let answers = [
				["Только я", "1-5", "11-25", "26-50", "51-100", "Более 1000", "radio"],
				["Да", "Нет", "radio"],
				["ВКонтакте", "Facebook", "Instagram", "Twitter", "checkbox"]
			  ]

/* Баллы */
let scoreFirst = {
	"Только я": '1',
	"1-5": '2',
	"11-25": '3',
	"26-50": '4',
	"51-100": '5',
	"Более 1000": '6'
};
let scoreSecond = {
	"Да": '2',
	"Нет": '-1'
};
let scoreThrid = {
	"ВКонтакте": '1',
	"Facebook": '3',
	"Instagram": '2',
	"Twitter": '4'
};

let number = 1; // Счетчик номера вопроса
let allAnswers = []; // Массив для записи ответов
let backBtn = document.querySelector('.navigation__back'); // Сразу находим кнопку возврата назад
backBtn.disabled = 1; // Блокируем эту кнопку
headerQuestion(questions[0]); // Запускаем функцию заполнения строки с вопросом, отпраявляя в нее первый элемент массива с вопросам
mainOptions(answers[0]); // Теперь запускаем функцию заполнения вариантов ответа, отправляя элемент массива с ответами


// Функция перехода к следующему вопросу, запускается по нажатию кнопки далее
function nextQuestion() {
	choice(number); // Записываем ответ
	number++;// Записываем номер
	if (number == 1) {// Проверяем номер вопроса и заполняем в соответствии
		backBtn.disabled = 1;// блокируем кнопку назад
	} else if (number == 2) {
		headerQuestion(questions[1]);// Вопрос
		mainOptions(answers[1]);//Ответы
		progressLine()// Полоса прогресса
		backBtn.disabled = 0; // разблокируем кнопку вперед 
	} else if (number == 3) {
		headerQuestion(questions[2]);
		mainOptions(answers[2]);
		progressLine();
		backBtn.disabled = 0;
	} else if (number == 4) {
		createFinishSlide(); // очищаем контейнер и формируем финальный лист
	}

}

// Функция перехода к предидущему вопросу
function backQuestion() {
	number--;// возвращаемся назад, значит номер овпроса возвращаем на предидущий
	allAnswers.pop();// удаляем последний записанный ответ
	if (number == 1) {
		headerQuestion(questions[0]);
		mainOptions(answers[0]);
		progressLine()
		backBtn.disabled = 1;
	} else if (number == 2) {
		headerQuestion(questions[1]);
		mainOptions(answers[1]);
		progressLine()
		backBtn.disabled = 0;
	} else if (number == 3) {
		headerQuestion(questions[2]);
		mainOptions(answers[2]);
		progressLine();
		backBtn.disabled = 0;
	} else if (number == 4) {
		createFinishSlide();
	}
}

// Функция создает пустой лист и публикует баллы после прохождения теста
function createFinishSlide() {
	document.querySelector('.conteiner').innerHTML = '';//Очищаем контейнер
	let finishSlide = document.createElement('div');// создаем див и добавляем классы
	finishSlide.classList.add('conteiner__finish');
	finishSlide.innerHTML = `
							<span class="finish-header">Тест пройден</span>
							<span class="finish-result">У вас `+ scoreSum(allAnswers) +` баллов</span>
							`;
	document.querySelector('.conteiner').appendChild(finishSlide);// добавляем на страницу
}

// Функция подсчета баллов по массиву с ответами
function scoreSum() {
	let sum = 0;
	sum += Number(scoreFirst[allAnswers[0]]);
	sum += Number(scoreSecond[allAnswers[1]]);
	for (let i = 2; i < allAnswers.length; i++) {
		sum += Number(scoreThrid[allAnswers[i]]);
	}
	return sum;
}

// Функция записи ответов в массив
function choice(i) {
	if (answers[i-1][answers[i-1].length-1] == 'radio') {// определяем где радио а где чикбокс и поразному закидываем в массив
		allAnswers.push(document.forms.answers.elements.rb.value);
	} else if (answers[i-1][answers[i-1].length-1] == 'checkbox') {
		for (let j = 1; j < answers[i-1].length; j++) {
			if (document.getElementById('rb'+ j).checked) {
				allAnswers.push(document.getElementById('rb'+ j).value);
			}
		}
	}	
}

// Функция создания вопросов
function headerQuestion(questionNum) {
	let header = document.querySelector('.conteiner__header'); // Ищем блок с самим вопросом
	header.innerHTML = '';
	let question = document.createElement('span'); // Создаем спан куда засунем вопрос
	question.innerHTML = questionNum; // Вставляеи вопрос
	header.appendChild(question); // Вставляем в блок хедера, спан с вопросом
}

// Функция создания вариантов ответа
function mainOptions(optionsNum) {
	let btn = document.querySelector('.navigation__future');
	let main = document.querySelector('.conteiner__options');
	main.innerHTML = '';
	for (var i = 0; i < optionsNum.length - 1; i++) {
		let option = document.createElement('div');
		option.classList.add('option');
		option.classList.add(optionsNum[optionsNum.length - 1]);
		option.innerHTML = `
							<input type="`+ optionsNum[optionsNum.length - 1] +`" value="`+ optionsNum[i] +`" name="rb" id="rb`+ (i+1) +`" onclick="agreeForm(`+ (i+1) +`)"> 
							<label for="rb`+ (i+1) +`">`+ optionsNum[i] +`</label>
							`; // Вставляеи вопрос
		main.appendChild(option);
	}
	btn.disabled = 1;
}

// Функция блокировки кнопки при отсутствии выбора
function agreeForm(option) {
	let countCheckbox = 0;// Количество чекбоксов на экране
	let find = document.getElementById('rb'+option);// ищем инпуты
	let btn = document.querySelector('.navigation__future'); 
	if (number == 3) {// если третяя карточка - активные чекбоксы, чтоб после отжимания одного чекбокса не блокировалась кнопка
		for (let i = 1; i < 5; i++) {
			if (document.getElementById('rb'+i).checked) {
					countCheckbox++;// если чекбокс нажат, прибавляем к счетчику 
			}
		}
	}
	if (find.checked) {// при нажатии на радио/чекбокс - кнопка активна
		btn.disabled = 0;
		if (number <= 2) {
			nextQuestion();// если 1 или 2 карточка, следоваельно чекбоксов нет, значит сразу направляем на след вопрос
		}
	}
	else {
		if (countCheckbox > 0) {// если чекбоксы есть, отнимаем по одному
			countCheckbox--;
		} else {
			btn.disabled = 1;
		}
	}
} 

// Функция заполнения линии прогресса
function progressLine() {
	let procent = document.querySelector('.procent');
	let line = document.querySelector('.color-line');
	procent.textContent = number * 33;
	line.style.width = Number(procent.textContent) + '%';
}
