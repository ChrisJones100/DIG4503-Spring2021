import chalk from 'chalk'

export default class Person{
    constructor(name, favoriteColor){
        this.name = name;
        this.favoriteColor = favoriteColor;
    }

    speak(){
        console.log(chalk.hex(this.favoriteColor)(this.name))
    }
}




