let mongoose = require('mongoose');
let Card = require('./models/card.model');
let Category = require('./models/category.model');
let cardData = [
    // Base Pack Black Cards (20)
    {
        category: 'Base',
        type: 'black',
        content: '____. Betcha can\'t have just one!'
    },
    {
        category: 'Base',
        type: 'black',
        content: '____. High five, bro.'
    },
    {
        category: 'Base',
        type: 'black',
        content: '____. It\'s a trap!'
    },
    {
        category: 'Base',
        type: 'black',
        content: '____. That was so metal.'
    },
    {
        category: 'Base',
        type: 'black',
        content: '____: kid-tested, mother-approved.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'After four platinum albums and three Grammys, it\'s time to get back to my roots, to what inspired me to make music in the first place: ____.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'A romantic, candlelit dinner would be incomplete without ____.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'Alternative medicine is now embracing the curative powers of ____.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'As the mom of five rambunctious boys, I\'m no stranger to ____.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'Brought to you by Bud Light®, the official Beer of ____.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'Brought to you by Molson Canadian, the Official Beer of ____.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'But before I kill you, Mr. Bond, I must show you ____.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'A	Check me out, yo! I call this dance move "____."'
    },
    {
        category: 'Base',
        type: 'black',
        content: '	Coming to Broadway this season, ____: The Musical.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'Dear Abby, I\'m having some trouble with ____ and would like your advice.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'Dude, do not go in that washroom. There\'s ____ in there.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'Hey guys, welcome to Chili\'s! Would you like to start the night off right with ____?'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'How did I lose my virginity?'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'I drink to forget ____.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'I get by with a little help from ____.'
    },
    {
        category: 'Base',
        type: 'black',
        content: 'I get by with a little help from ____.'
    },
    // Base Pack White Cards (40)
    {
        category: 'Base',
        type: 'white',
        content: 'A bird that shits human turds.'
    },
    {
        category: 'Base',
        type: 'white',
        content: '50,000 volts straight to the nipples.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'A Bop It.™'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'A bowl of mayonnaise and human teeth.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'A fart so powerful that it wakes the giants from their thousand-year slumber.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'A fetus.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'A crucifixion.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'A fuck-ton of almonds.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'A good, strong gorilla.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'A good sniff.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'A lifetime of sadness.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'A micropenis.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'An old guy who\'s almost dead.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Child abuse.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Consensual sex.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Danny DeVito.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Crippling debt.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Grandma.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Hobos.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Hot people.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'However much weed $20 can buy.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Inappropriate yodeling.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Laying an egg.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Listening to her problems without trying to solve them.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'White privilege.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Man meat.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Mansplaining.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Me time.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'My abusive boyfriend who really isn\'t so bad once you get to know him.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Necrophilia.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Vehicular manslaughter.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Vigorous jazz hands.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'Waking up half-naked in a Denny\'s parking lot.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'These hoes.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'The violation of our most basic human rights.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'The Patriarchy.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'The Kool-Aid Man.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'The heart of a child.'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'The cool, refreshing taste of Pepsi.®'
    },
    {
        category: 'Base',
        type: 'white',
        content: 'The miracle of childbirth.'
    },
    // Pack 1 Black Cards (5)
    {
        category: 'NSFW',
        type: 'black',
        content: 'During sex, I like to think about ____.'
    },
    {
        category: 'NSFW',
        type: 'black',
        content: 'Fun tip! When your man asks you to go down on him, try surprising him with ____ instead.'
    },
    {
        category: 'NSFW',
        type: 'black',
        content: 'What brought the orgy to a grinding halt?'
    },
    {
        category: 'NSFW',
        type: 'black',
        content: 'When all else fails, I can always masturbate to ____.'
    },
    {
        category: 'NSFW',
        type: 'black',
        content: 'What\'s the one thing that makes an elf instantly ejaculate?'
    },
    // Pack 1 White Cards (10)
    {
        category: 'NSFW',
        type: 'white',
        content: 'A Fleshlight.®'
    },
    {
        category: 'NSFW',
        type: 'white',
        content: 'A bleached asshole.'
    },
    {
        category: 'NSFW',
        type: 'white',
        content: 'A gossamer stream of jizz that catches the light as it arcs through the morning air.'
    },
    {
        category: 'NSFW',
        type: 'white',
        content: 'A man on the brink of orgasm.'
    },
    {
        category: 'NSFW',
        type: 'white',
        content: 'A sad handjob.'
    },
    {
        category: 'NSFW',
        type: 'white',
        content: 'A snapping turtle biting the tip of your penis.'
    },
    {
        category: 'NSFW',
        type: 'white',
        content: 'A stray pube.'
    },
    {
        category: 'NSFW',
        type: 'white',
        content: 'An erection that lasts longer than four hours.'
    },
    {
        category: 'NSFW',
        type: 'white',
        content: 'An icy handjob from an Edmonton hooker.'
    },
    {
        category: 'NSFW',
        type: 'white',
        content: 'An octopus giving seven handjobs and smoking a cigarette.'
    },
    // Pack 2 Black Cards (5)
    {
        category: 'Holidays',
        type: 'black',
        content: 'After blacking out during New Year\'s Eve, I was awoken by ____.'
    },
    {
        category: 'Holidays',
        type: 'black',
        content: 'Every Christmas, my uncle gets drunk and tells the story about ____.'
    },
    {
        category: 'Holidays',
        type: 'black',
        content: 'On the third day of Christmas, my true love gave to me: three French hens, two turtle doves, and ____.'
    },
    {
        category: 'Holidays',
        type: 'black',
        content: 'This holiday season, Tim Allen must overcome his fear of ____ to save Christmas.'
    },
    {
        category: 'Holidays',
        type: 'black',
        content: 'Wake up, America. Christmas is under attack by secular liberals and their ____.'
    },
    // Pack 2 White Cards (10)
    {
        category: 'Holidays',
        type: 'white',
        content: '200 years of slavery.'
    },
    {
        category: 'Holidays',
        type: 'white',
        content: 'A Christmas stocking full of coleslaw.'
    },
    {
        category: 'Holidays',
        type: 'white',
        content: 'A toxic family environment.'
    },
    {
        category: 'Holidays',
        type: 'white',
        content: 'Another shitty year.'
    },
    {
        category: 'Holidays',
        type: 'white',
        content: 'Eating an entire snowman.'
    },
    {
        category: 'Holidays',
        type: 'white',
        content: 'Finding out that Santa isn\'t real.'
    },
    {
        category: 'Holidays',
        type: 'white',
        content: 'Fucking up "Silent Night" in front of 300 parents.'
    },
    {
        category: 'Holidays',
        type: 'white',
        content: 'Rudolph\'s bright red balls.'
    },
    {
        category: 'Holidays',
        type: 'white',
        content: 'Santa\'s heavy sack.'
    },
    {
        category: 'Holidays',
        type: 'white',
        content: 'Mall Santa.'
    },

];

const seedDB = () => {
    Food.remove({}, (err) => {
        if(err){
            console.log(err);
        } else {
            console.log('Removed all food items.');
            data.forEach(function(seed){
                Food.create(seed, function(err, food){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('Added a food item.')
                    }
                });
            });
        }
    });
}

module.exports = seedDB;