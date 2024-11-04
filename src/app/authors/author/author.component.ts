import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthornamesPipe} from "../../pipes/authornames.pipe";
import {NgIf} from "@angular/common";
import {Author} from "../../books/model/book";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AuthorsService} from "../service/authors.service";

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    AuthornamesPipe,
    NgIf
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorsService: AuthorsService = inject(AuthorsService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.authorsService.getAuthor(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
        },
        error: (_: any) => {
          this.selectedAuthor = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
