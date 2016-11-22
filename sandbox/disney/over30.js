function findByAge(records) {
  
    var found = [];
    var i, age, diff, personBirthDate;
    var record = {};
    var today = new Date();
    console.log("As of today, " + today + ":");

    for (i = 0; i < records.length; i += 1) {
        record = records[i];

        personBirthDate = new Date(record.birthdate);
        diff = today - personBirthDate;
        age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

        if (age >= 30) {
            found.push({
                name: record.name,
                birthdate: record.birthdate,
                age: age
            });
            console.log(record.name + " is about " + age);
        } else {
            console.log(record.name + " is not, being about " + (30 - age) + " years to young.");
        }
    }
    console.dir(found);
    return found;
}
