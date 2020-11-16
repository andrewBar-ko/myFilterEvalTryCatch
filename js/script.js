'use strict';
// Функция которая принимает два аргумента type - тип данных, ...values - массив значений,
// с помощью метода filter создаем массив с данными соотвествуещего типа
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
    // Функция создания массива и перебора ее с помощью метода forEach
	hideAllResponseBlocks = () => {
		// переменная с массивом из всех div с классом dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// перебор массива и присвоение элементам block стиль display = 'none'
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	// функция которая принимает блок селоктора,текст сообщения и строку
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// вызов функции с массивом
		hideAllResponseBlocks();
		// присвоение блоку стиля 
		document.querySelector(blockSelector).style.display = 'block';
		// условие : если передан селектор строки, то ...
		if (spanSelector) {
			// в эту строку записываем переданное сообщение
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// функция вывода, блока с ошибкой если есть ошибка
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// функция вывода, блока с результатом если нет ошибки
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// функция вывода, без результата
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// функция принимающая тип данных и значение 
	tryFilterByType = (type, values) => {
		// конструкция перехвата ошибок:
		// если нет ошибки, то ...
		try {
			// метод выполняет код, который запускает функцию filterByType и выводит значение type и value через запятую
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// если длина массива true, то 
			const alertMsg = (valuesArray.length) ?
				//тернарный оператор ? вернет значение... 
				`Данные с типом ${type}: ${valuesArray}` :
				// иначе 
				`Отсутствуют данные типа ${type}`;
			// вывод значения alertMsg
			showResults(alertMsg);
		// а если обнаружена ошибка, то ...
		} catch (e) {
			// вывод ошибки
			showError(`Ошибка: ${e}`);
		}
	};
// получение кнопки со страницы
const filterButton = document.querySelector('#filter-btn');
// вешаем на кнопку событие click
filterButton.addEventListener('click', e => {
	// получение переменных со страницы
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');
    // Условие - если значение инпута пусто, то...
	if (dataInput.value === '') {
		// выводим сообщение 
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// и возвращаем стандартное значение
		showNoResults();
	// иначе -	
	} else {
		// очищаем значение инпута
		dataInput.setCustomValidity('');
		// отменяем стандартное действия браузера
		e.preventDefault();
		// и запускаем функцию вывода значений инпутов без пробелов
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

