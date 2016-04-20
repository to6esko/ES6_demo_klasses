import "babel-polyfill";

//Класове

//ES 5

function PersonType(name) {
	this.name = name;
}
PersonType.prototype.sayName = function() {
	console.log(this.name);
};
let person = new PersonType('Todor');
person.sayName(); //outputs Todor

console.log(person instanceof PersonType); //true
console.log(person instanceof Object); //true

console.log('.'.repeat(20));

//ES 6
/*
// Class espresinons
let PersonClass = class PersonClass2 {
	constructor(name) {
		this.name = name;
	}
	sayName() {
		console.log(this.name);
	}
}
*/

class PersonClass {
	// еквивалентно на конструктора PersonType
	constructor(name) {
		this.name = name;
	}

	// еквивалентно на PersonType.prototype.sayName
	sayName() {
		console.log(this.name);
	}
}

let person1 = new PersonClass("Todor");
person1.sayName(); // outputs "Todor"

console.log(person1 instanceof PersonClass); // true
console.log(person1 instanceof Object); // true

console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass.prototype.sayName); // "function"



// директен еквивалент на PersonClass
let PersonType2 = (function() {
	"use strict";
	const PersonType2 = function(name) {
		// уверете се, че функцията се извиква с new
		if (typeof new.target === 'undefined') {
			throw new Error('Costructor must be called with new.');
		}
		this.name = name;
	}
	Object.defineProperty(PersonType2.prototype, 'sayName', {
		value: function() {
			// уверете се, че метода не се извиква с new
			if (typeof new.target !== 'undefined') {
				throw new Error('Method must be called with new.')
			}
			console.log(this.name);
		},
		enumerable: false,
		writable: true,
		configurable: true
	});
	return PersonType2;
}());

console.log('.'.repeat(20));



//Accessor- set and get

class CustumaHTMLElement {
	constructor(element) {
		this.element = element;
	}
	get html() {
		return this.element.innerHTML;
	}
	set html(value) {
		this.element.innerHTML = value;
	}
}

var descriptor = Object.getOwnPropertyDescriptor(CustumaHTMLElement.prototype, "html");
console.log('get' in descriptor); //true
console.log('set' in descriptor); //true
console.log(descriptor.enumerable); //false


console.log('.'.repeat(20));


// Изчисляване на имена
let propertyName = "html";

class CustomHTMLElement {

	constructor(element) {
		this.element = element;
	}

	get[propertyName]() {
		return this.element.innerHTML;
	}

	set[propertyName](value) {
		this.element.innerHTML = value;
	}
}


//Generarors

class MyClass { * createIternator() {
		yield 1;
		yield 2;
		yield 3;
	}
}
let instance = new MyClass();
let iterator = instance.createIternator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


console.log('.'.repeat(20));


class Collection {
	constructor() {
		this.items = [];
	} * [Symbol.iterator]() {
		yield * this.items.values();
	}
}
var collection = new Collection();
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);
for (let x of collection) {
	console.log(x);
}



console.log('.'.repeat(20));

// Статични членове
function PersonType(name) {
	this.name = name;
}
PersonType.create = function(name) {
	return new PersonType(name);
}
PersonType.prototype.sayName = function() {
	console.log(this.name);
};
var person2 = PersonType.create('Todor');

//ES 6 еквивалентно на PersonType конструктора
class PersonClass3 {
	constructor(name) {
		this.name = name;
	}
	sayName() {
		console.log(this.name);
	}
	static create(name) {
		return new PersonClass3(name);
	}
}
let person3 = PersonClass3.create('Todor');
person3.sayName();


console.log('.'.repeat(20));



// Наследяване с производни класове

//ES 5

function Rectangle(length, width) {
	this.length = length;
	this.width = width;
}
Rectangle.prototype.getArea = function() {
	return this.length * this.width;
};

function Square(length) {
	Rectangle.call(this, length, length);
}
Square.prototype = Object.create(Rectangle.prototype, {
	constructor: {
		value: Square,
		enumerable: true,
		writable: true,
		configurable: true
	}
});
var square = new Square(3);

console.log(square.getArea()); //9
console.log(square instanceof Square); //true
console.log(square instanceof Rectangle); //true

console.log('.'.repeat(20));

//ES 6
class Rectangle1 {
	constructor(length, width) {
		this.length = length;
		this.width = width;
	}
	getArea() {
		return this.length * this.width;
	}
}

class Square1 extends Rectangle {
	constructor(length) {
		super(length, length);
	}
}
var square1 = new Square1(3);

console.log(square1.getArea()); //9
console.log(square1 instanceof Square1); //true
console.log(square1 instanceof Rectangle1); //true

console.log('.'.repeat(20));

//Динамично наследяване
function Rectangle3(length, width) {
	this.length = length;
	this.width = width;
}
Rectangle3.prototype.getArea = function() {
	return this.length * this.width;
};

function getBase() {
	return Rectangle3;
}
class Square3 extends getBase() {
	constructor(length) {
		super(length, length);
	}
}
var x = new Square3(3);
console.log(x.getArea()); // 9
console.log(x instanceof Rectangle3); //true

console.log('.'.repeat(20));

//mixin
let SerializableMixin = {
	serialize() {
		return JSON.stringify(this);
	}
};
let AreaMixin = {
	getArea() {
		return this.length * this.width;
	}
};

function mixin(...mixins) {
	var base = function() {};
	Object.assign(base.prototype, ...mixins);
	return base;
}
class Square4 extends mixin(AreaMixin, SerializableMixin) {
	constructor(length) {
		super();
		this.length = length;
		this.width = length;
	}
}
var x = new Square4(3);
console.log(x.getArea()); //9
console.log(x.serialize()); // "{"length":3,"width":3}"



console.log('.'.repeat(20));



//Symbol.species property

class MyArray extends Array {
	static get[Symbol.species]() {
		return Array;
	}
}
let items = new MyArray(1, 2, 3, 4, 5),
	subitems = items.slice(1, 3);


console.log(items instanceof MyArray); //true  //my output false
console.log(items instanceof Array); //true	
console.log(subitems instanceof MyArray); //true //my output false
console.log(subitems instanceof Array); //false  //my output true
console.log(items); // [1,2,3,4,5]
console.log(subitems); //[2,3]


console.log('.'.repeat(20));



class MyClass1 {
	static get[Symbol.species]() {
		return this;
	}
	constructor(value) {
		this.value = value;
	}
	clone() {
		return new this.constructor[Symbol.species](this.value);
	}
}
class MyDerivedClass1 extends MyClass1 {
	//empty
}
class MyDerivedClass2 extends MyClass1 {
	static get[Symbol.species]() {
		return MyClass1;
	}
}
let instance1 = new MyDerivedClass1('foo'),
	clone1 = instance1.clone(),
	instance2 = new MyDerivedClass2('bar'),
	clone2 = instance2.clone();
console.log(clone1 instanceof MyClass1); //true
console.log(clone1 instanceof MyDerivedClass1); //true
console.log(clone2 instanceof MyClass1); //true
console.log(clone2 instanceof MyDerivedClass2); //false



console.log('.'.repeat(20));



//The new.target

class Rectangle4 {
	constructor(length, width) {
		console.log(new.target === Rectangle4);
		this.length = length;
		this.width = width;
	}
	getArea() {
		return this.length * this.width;
	}
}

// new.target is Rectangle4
var obj = new Rectangle4(3, 4); //true

class Square5 extends Rectangle4 {
	constructor(length) {
		super(length, length);
	}
}
var obj1 = new Square(3); //false
console.log(obj.getArea()); //12
console.log(obj1.getArea()); //9


class Shape {
	constructor() {
		if (new.target === Shape) {
			throw new Error('This class cannot be instantiated directly.');
		}
	}
}
class Rectangle5 extends Shape {
	constructor(length, width) {
		super();
		this.length = length;
		this.width = width;
	}
	getArea(){
		return this.length * this.width;
	}
}

//var x = new Shape(); //Throw new Error
var y = new Rectangle5(3, 4);
console.log(y instanceof Shape); //true
console.log(y.getArea()); //12