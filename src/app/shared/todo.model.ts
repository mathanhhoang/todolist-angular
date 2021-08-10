export class Todo {
    constructor(
        public title: string,
        public text: string,
        public date: Date,
        public completed: boolean = false
    ) {

    }
}