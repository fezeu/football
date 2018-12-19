import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';





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
             
              $('#prev img').attr('src',this.result);
              
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

  $('#buttonph').click((e)=>{
    e.preventDefault();
    $('#file').trigger('click');

  });
  
 
  
  }
  sendep(file){
    

    if(!file.files[0]){
      return  this.add()
    }
    var xhr = new XMLHttpRequest();
    
    xhr.open('POST', '/photoequipe');

    

    xhr.addEventListener('load', (e)=> {
      let t =JSON.parse( xhr.response)
      if(t.status){
        this.equipe.banniere = t.name
      }
      
      this.add()
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
        $('#prev img').attr('src','');
      }
    })
  }
}
