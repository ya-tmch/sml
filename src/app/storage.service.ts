import {Injectable} from '@angular/core';
import {User} from './auth.service';

@Injectable()
export class StorageService {
    private answers: Answer[] = [];

    constructor() {
        if (localStorage.getItem('answers')) {
            this.answers = JSON.parse(localStorage.getItem('answers'));
        }
    }

    protected save(): void {
        localStorage.setItem('answers', JSON.stringify(this.answers));
    }

    public delAnswer(user: User): void {
        for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i].user.id === user.id) {
                this.answers.splice(i, 1);
                break;
            }
        }

        this.save();
    }

    public addAnswer(answer: Answer): void {
        const exist: Answer = this.getAnswer(answer.user);

        if (exist !== null) {
            this.delAnswer(answer.user);
        }

        this.answers.push(answer);
        this.save();
    }

    public getAnswer(user: User): Answer {
        return this.answers.find((a: Answer) => a.user.id === user.id);
    }

    public getAnswers(): Answer[] {
        return this.answers;
    }
}

export class Answer {
    public user: User;
    public willCome: boolean;
    public withUserCount: number;
}
