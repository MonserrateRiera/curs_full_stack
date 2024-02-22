const mongoose = require('mongoose'); 


const entrySchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
})
const Entry = mongoose.model('Entry', entrySchema);

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  } 
const password = process.argv[2];
const url = `mongodb+srv://user1:${password}@cluster0.bcqaneg.mongodb.net/PhoneGuide?retryWrites=true&w=majority`  
mongoose.set('strictQuery',false)
mongoose.connect(url)

if(process.argv.length===3){
    const phoneList = Entry.find({})
        .then(result => {
            result.forEach(entry =>{
                console.log(entry);
            })
            mongoose.connection.close();
        })
        .catch(e=>console.log(e))
}

if(process.argv.length ===5){
    const name = process.argv[3];
    const phoneNumber = process.argv[4];
    
    const entry = new Entry({
        name,
        phoneNumber
    });
    entry.save()
        .then(result =>{
            console.log(`Added ${name}, number ${phoneNumber} in the ponelist.`);
            mongoose.connection.close()
        })
        .catch(e=>console.log(e));
}