// import { Schema, model } from 'mongoose';
// const QuoteSchema = new Schema({
//     quote: String,
//     author: String,
//     id: Number,
//   });
// const QuoteModelDB = model("quotes", QuoteSchema)
// class Quote{
//     constructor(
//     public quote: string,
//     public author: string,
//     public id: number){}
// }
// const quotes:Quote[]= [
//     new Quote("Believe you can and you're halfway there.", "Theodore Roosevelt", 1),
//     new Quote("The only way to do great work is to love what you do.", "Steve Jobs", 2),
//     new Quote("Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill", 3),
//     new Quote("Don't watch the clock; do what it does. Keep going.", "Sam Levenson", 4),
//     new Quote("Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", "Christian D. Larson", 5),
//     new Quote("Success is walking from failure to failure with no loss of enthusiasm.", "Winston Churchill", 6),
// ]
// nameArrayDB()
// function nameArrayDB(){
//    quotes.forEach(quote => {
//     quotesGenerator(quote.quote, quote.author,quote.id )
//    })
// }
// async function quotesGenerator(quote,author,id){
//     const user = await QuoteModelDB.create({
//         quote:quote,
//         author:author,
//         id:id,
//     })
// }
