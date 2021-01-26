import { Component, OnInit,} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Site } from 'src/app/models/site.model';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-site-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newSite:Site = {id:null, name:"", active:1};

  constructor(public siteService: SitesService) { }

  ngOnInit(): void {
  }

  onAddSite(form: NgForm){
    if(form.invalid){
      return;
    }
      console.log("post added", form.value)
      this.newSite.name = form.value.name;
      this.newSite.active = form.value.active;
      this.siteService.addSite(this.newSite);
      this.newSite = {name:"", active:1, id:null};
      form.resetForm();


  }

}
