import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit {
  joueurs = []
  photo ;
  @Input('_id') _id;
  @Output('event') event:EventEmitter <any> = new EventEmitter();
  private photoe: EventEmitter<any> = new EventEmitter()
  equipe = {id:'',_id:'',nom:'',coach:'',represente:'',banniere:''}
  constructor(
    private comp : CreateCompService
  ) {
    
   }

  ngOnInit() {
  
    (()=> {

      function createThumbnail(file) {
  
          var reader = new FileReader();
          
          reader.addEventListener('load', function() {
  
              var imgElement = document.createElement('img');
              imgElement.style.maxWidth = '150px';
              imgElement.style.maxHeight = '150px';
              imgElement.src = this.result;
              prev.appendChild(imgElement);
           
  
          });
  
          reader.readAsDataURL(file);
         
      }
  
      var allowedTypes = ['png', 'jpg', 'jpeg', 'gif'],
          fileInput = document.querySelector('#file'),
          prev = document.querySelector('#prev');
  
      fileInput.addEventListener('change', function() {
  
          var files = this.files,
              filesLen = files.length,
              imgType;
              this.photo = files[0]
              createThumbnail(files[0]);
          
      });
  
  })();

  
  }
  sendep(file){
    


    var xhr = new XMLHttpRequest();
    
    xhr.open('POST', '/photoequipe');

    

    xhr.addEventListener('load', (e)=> {
      if(xhr.response.status){
        this.equipe.banniere = xhr.response.name
      }
        alert('Upload terminé !');
    });

    var form = new FormData();
    form.append('equipe', file.files[0]);

    xhr.send(form);


    
      
      
    
  }
  
  neww(e){
    if(e)
    this.joueurs.push(e)
  }
  add(){
    this.equipe.id = this._id;
    this.comp.set_equipe(this.equipe).subscribe((e)=>{
      if([e['status']]){
        this.joueurs = []
        this.photo = ''
        this.equipe = {id:'',_id:'',nom:'',coach:'',represente:'',banniere:''};
      }
    })
  }
}
