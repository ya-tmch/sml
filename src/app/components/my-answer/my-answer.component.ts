import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {AuthService, User} from '../../auth.service';
import {Answer, StorageService} from '../../storage.service';

declare var $;

@Component({
    providers: [],
    selector: 'app-my-answer',
    templateUrl: './my-answer.component.html',
    styleUrls: ['./my-answer.component.scss']
})
export class MyAnswerComponent implements AfterViewInit, OnDestroy {
    static isFirstOpening = true;
    @ViewChild('submit') submit;
    public form: Form = new Form();
    public wait = false;

    constructor(
        private auth: AuthService,
        private storage: StorageService
    ) {
        const user: User = auth.getUser();
        const answer: Answer = storage.getAnswer(user);

        // При первом открытии подставляем данные из ответа (если есть)
        // в остальных случаях данные из FB
        if (answer && MyAnswerComponent.isFirstOpening) {
            this.form.name = answer.user.name;
            this.form.willCome = answer.willCome;
            this.form.withUserCount = answer.withUserCount;
        } else {
            this.form.name = user.name;
            this.form.willCome = null;
            this.form.withUserCount = 0;
        }

        MyAnswerComponent.isFirstOpening = false;
    }

    ngAfterViewInit(): void {
        $(this.submit.nativeElement).popover({trigger: 'manual'});
        $(this.submit.nativeElement).on('blur', () => $(this.submit.nativeElement).popover('hide'));
    }

    private showPopover(): void {
        $(this.submit.nativeElement).popover('show');
    }

    private hidePopover(): void {
        $(this.submit.nativeElement).popover('hide');
    }

    public send(): void {
        if (this.form.willCome === null) {
            // Если "не определелися", то удаляем, да?
            this.storage.delAnswer(this.auth.getUser());
            this.showPopover();
        } else {
            this.wait = true;

            const answer: Answer = new Answer();
            answer.user = Object.assign({}, this.auth.getUser(), {name: this.form.name});
            answer.willCome = this.form.willCome;
            answer.withUserCount = this.form.withUserCount;

            this.storage.addAnswer(answer);

            setTimeout(() => this.wait = false, 500);
            this.hidePopover();
        }
    }

    public ngOnDestroy(): void {
        $(this.submit.nativeElement).popover('dispose');
    }
}

class Form {
    name: string;
    willCome: boolean;
    withUserCount: number;
}
