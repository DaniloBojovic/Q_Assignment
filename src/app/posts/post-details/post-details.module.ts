import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details.component';
import { PostDetailsRoutingModule } from './post-details-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostDetailsComponent],
  imports: [CommonModule, PostDetailsRoutingModule],
})
export class PostDetailsModule {}
