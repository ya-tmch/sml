import {Component, ViewChild} from '@angular/core';
import {Answer, StorageService} from '../../storage.service';
import {AuthService} from '../../auth.service';

@Component({
    providers: [],
    selector: 'app-all-answers',
    templateUrl: './all-answers.component.html',
    styleUrls: ['./all-answers.component.scss']
})
export class AllAnswersComponent {
    @ViewChild('modalWindow') modalWindow;
    public deleteAnswer: Answer;
    public searchStr = '';

    constructor(
        public auth: AuthService,
        public storage: StorageService
    ) {}

    public getAnswers(): Answer[] {
        if (this.searchStr) {
            return this.storage.getAnswers().filter((el: Answer) => {
                return el.user.name.indexOf(this.searchStr) !== -1;
            });
        } else {
            return this.storage.getAnswers();
        }
    }

    public openDelModal(answer: Answer): void {
        if (answer.user.id === this.auth.getUser().id) {
            this.deleteAnswer = answer;
        }
    }

    public modalResult(result: boolean): void {
        if (result) {
            this.storage.delAnswer(this.deleteAnswer.user);
        }

        this.deleteAnswer = null;
    }
}
