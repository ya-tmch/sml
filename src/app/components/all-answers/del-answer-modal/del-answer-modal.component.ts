import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

declare var $;

@Component({
    selector: 'app-del-answer',
    template: `
        <div class="modal fade" #modalWindow>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Подтверждение!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Я {{ userName }} хочу отказаться от своего решения и удалить свой ответ
                    </div>
                    <div class="modal-footer">
                        <button (click)="no()" type="button" class="btn btn-secondary">Нет</button>
                        <button (click)="yes()" type="button" class="btn btn-primary">Да</button>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class DelAnswerModalComponent implements AfterViewInit {
    @ViewChild('modalWindow') modalWindow;
    @Input('userName') userName: string;
    @Output('modalResult') modalResult: EventEmitter<boolean> = new EventEmitter;
    public result = false;

    public yes(): void {
        this.result = true;
        this.hide();
    }

    public no(): void {
        this.result = false;
        this.hide();
    }

    private hide(): void {
        $(this.modalWindow.nativeElement).modal('hide');
    }

    public ngAfterViewInit(): void {
        $(this.modalWindow.nativeElement).modal('show');
        $(this.modalWindow.nativeElement).on('hidden.bs.modal', () => {
            this.modalResult.emit(this.result);
        });
    }
}
