import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  welcomeMessageFromService = ''
  name = ''
  // Activated Route
  constructor(
    private route:ActivatedRoute,
    private service: WelcomeDataService)
     { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessage(){
    //console.log(this.service.executeHelloWorldService());
    this.service.executeHelloWorldService().subscribe(
        response => this.handleSuccessfulResponse(response),
        error => this.handleErrorMessage(error)
    );
    //console.log('last line of getWelcomeMessage');
    //console.log("Welcome Customised")
  }

  getWelcomeMessageWithParameter(){
    //console.log(this.service.executeHelloWorldService());
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
        response => this.handleSuccessfulResponse(response),
        error => this.handleErrorMessage(error)
    );
    //console.log('last line of getWelcomeMessage');
    //console.log("Welcome Customised")
  }

  handleSuccessfulResponse(response){
    this.welcomeMessageFromService = response.message
    // console.log(response);
    // console.log(response.message);
  }

  handleErrorMessage(error){
    // console.log(error)
    // console.log(error.error)
    // console.log(error.error.message)
    this.welcomeMessageFromService = error.error.message
  }
}
