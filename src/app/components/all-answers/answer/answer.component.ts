import {Component, Input} from '@angular/core';
import {Answer} from '../../../storage.service';

@Component({
    providers: [],
    selector: 'app-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {
    @Input() answer: Answer;
    @Input() current: boolean;
}
