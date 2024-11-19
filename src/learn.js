const data = [
    { name: "John" },
    { name: "Jane" },
    { name: "Mike" },
    { name: "Emily" },
    { name: "Sarah" },
];

let deletedName = "John";

const removedData = data.filter(item => item.name !== deletedName)

console.log(removedData); // Output: [ { name: 'Jane' }, { name: 'Mike' }, { name: 'Emily' }, { name: 'Sarah' } ]

let quantity = 0;

quantity > 0 ? "js-display" : "";

let obj = {
    name: "John",
    age: 30,
    address: {
        street: "123 Main St",
        city: "New York",
        state: "NY"
    }
}

let obj2 =  {
    ...obj, quantity: 1
}

console.log(obj2); // Output: { name: 'John', age: 30, address: { street: '123 Main St', city: 'New York', state: 'NY' }, quantity: 1 }