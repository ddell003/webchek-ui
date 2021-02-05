import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Site } from 'src/app/models/site.model';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-site-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newSite: Site = {id: null, name: '', status: 1};

  constructor(public siteService: SitesService, private router: Router) { }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['/']);
  }

  onAddSite(form: NgForm){
    if (form.invalid){
      return;
    }
    console.log('post added', form.value);
    this.newSite.name = form.value.name;
    this.newSite.status = form.value.status;
    this.siteService.addSite(this.newSite);
    this.newSite = {name: '', status: 1, id: null};
    form.resetForm();
    this.router.navigate(['/']);


  }

}
