import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ActivityDrawerComponent } from './activity-drawer/activity-drawer.component';
import { MessengerDrawerComponent } from './messenger-drawer/messenger-drawer.component';
import { ChatInnerModule } from '../../content/chat-inner/chat-inner.module';
import { TasksDrawerComponent } from './tasks-drawer/tasks-drawer.component';

@NgModule({
  declarations: [
    ActivityDrawerComponent,
    MessengerDrawerComponent,
    TasksDrawerComponent,
  ],
  imports: [CommonModule, InlineSVGModule, RouterModule, ChatInnerModule],
  exports: [
    ActivityDrawerComponent,
    MessengerDrawerComponent,
    TasksDrawerComponent
  ],
})
export class DrawersModule {}
