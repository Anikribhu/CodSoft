var result = document.getElementById('result');
var smallResult = document.getElementById('smallResult');
var cal = false;
var val_1 = false;
var val_2 = false;
var oper = '+';
var operPressed = false;
var tot = 0;
var cal_done = false;
var currentStatus = 0;
var o;

function num(val) {
	val = val.toString();

	if (cal_done)
		cls(); 

	if (!operPressed) {
		if (!val_1) val_1 = 0;

		val_1 = val_1 + val;

		val_1 = lengthFix(val_1); 

		result.innerHTML = val_1;
		smallResult.innerHTML = val_1;
	}
	if (operPressed) {

		if (!val_2) val_2 = 0;

		val_2 = val_2 + val;

		val_2 = lengthFix(val_2); 

		result.innerHTML = val_2;
		smallResult.innerHTML = val_1 + oper + val_2;
	}
}


function calc(val) {
	if (val_1 && val_2) {
		operPressed = true;
		total();
		oper = val;
	}

	if (cal_done) {
		var x = (val_1 = tot);
		cls();
		val_1 = x;
		val_1 = lengthFix(val_1); 

		smallResult.innerHTML = +x + val;
		oper = val;
		operPressed = true;
	}

	if (!val_1 || operPressed) {
		return false;
	}

	if (val_1 && !val_2) {
		result.innerHTML = val;
		var a = smallResult.innerHTML.toString();
		smallResult.innerHTML = a + val;
		oper = val;
		operPressed = true;
	}
}

function total() {
	if (!val_1) return false;

	if (!val_2 && operPressed) {
		tot = magic(val_1, val_1, oper);
		tot = lengthFix(tot);
	}

	if (val_1 && val_2) {
		tot = magic(val_1, val_2, oper);
		tot = lengthFix(tot);
	}

	tot = tot.toString();
	var noDec = tot.indexOf('.') == -1;
	if (!noDec) tot = parseFloat(tot).toFixed(3);

	result.innerHTML = tot;
}

function magic(a, b, oper) {
	switch (oper) {
		case '+':
			tot = +a + +b;
			cal_done = true;
			break;
		case '-':
			tot = +a - +b;
			cal_done = true;
			break;
		case '/':
			tot = +a / +b;
			cal_done = true;
			break;
		case '*':
			tot = +a * +b;
			cal_done = true;
			break;
		default:
			return false;
	}
	return tot;
}


function cls() {
	smallResult.innerHTML = '';
	result.innerHTML = 0;
	val_1 = false;
	val_2 = false;
	oper = '+';
	tot = 0;
	cal_done = false;
	operPressed = false;
}

function lengthFix(o) {
	o = o.toString();

	if (o != 0 || o != '0') {
		if (o.charAt(0) == 0) o = o.slice(1);
	}

	if (o.toString().length > 12) o = o.substring(0, 12);

	return o;
}

document.onkeyup = function(e) {
	if (e.key == 110 || e.key == 190) num('.');
	if (e.key == 96 || e.key == 48) num('0');
	if (e.key == 97 || e.key == 49) num('1');
	if (e.key == 98 || e.key == 50) num('2');
	if (e.key == 99 || e.key == 51) num('3');
	if (e.key == 100 || e.key == 52) num('4');
	if (e.key == 101 || e.key == 53) num('5');
	if (e.key == 102 || e.key == 54) num('6');
	if (e.key == 103 || e.key == 55) num('7');
	if (e.key == 104 || e.key == 56) num('8');
	if (e.key == 105 || e.key == 57) num('9');

	if (e.key == 111) calc('/');
	if (e.key == 106) calc('*');
	if (e.key == 107) calc('+');
	if (e.key == 109) calc('-');

	if (e.key == 13) total();

	if (e.key == 8 || e.key == 46) cls();

	if (e.key == 27) cls();
};