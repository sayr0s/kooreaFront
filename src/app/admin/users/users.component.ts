import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  currentAdmin:any
  userType:any
  adminId = ""

  users:any = ""
  usersOffice:any = ""

  adminParamId:any

  isLoading = true

  constructor(private usersService:UsersService,private router: Router,private route: ActivatedRoute) { }

  returnFromPage(){

    this.usersService.usersShowAllList = true
    this.usersService.adminOpenedForCheckUsersList = ""
    this.router.navigate(['/admin/management/admins'])

  }

  openUserHistory(user:any){

    this.router.navigate(['/admin/management/user/history/'+user._id])

  }

  search(input:any){

    const text = input.target.value.toLowerCase()

    var selected:any = []

    this.usersOffice.forEach((item:any)=>{     

      const login = item.login.toLowerCase()
      const phone = item.teleJoueur.toLowerCase()
      const solde = (item.solde + "").toLowerCase()
      const name = item.name.toLowerCase()
      const lastName = item.lastName.toLowerCase()

      if(lastName.includes(text) || name.includes(text) || solde.includes(text) || phone.includes(text) || login.includes(text) ){
        selected.push(item)
      }

    })

    if(selected.length > 0){
      this.users = selected
    }else{
      this.users = this.usersOffice
    }

  }

  getUsers(listOf:any){

    if(listOf==="admin"){
      this.usersService.findAdmin(this.usersService.user.id).subscribe((res:any)=>{

        this.users = res.Listejoueurs
        this.usersOffice = res.Listejoueurs
        this.isLoading = false

        this.adminId = res._id
        

      })
    }else if(listOf==="start_admin"){
      this.usersService.getAllUsers().subscribe((res:any)=>{

        this.users = res
        this.usersOffice = res
        this.isLoading = false

      })
    }else{
      this.usersService.findAdmin(listOf).subscribe((res:any)=>{

        this.users = res.Listejoueurs
        this.usersOffice = res.Listejoueurs
        this.isLoading = false

        this.adminId = res._id
        

      })
    }

    

  }

  removeUser(user:any,item:any){

    this.usersService.deleteUser(user._id).subscribe((res:any)=>{
      item.remove()
    })

  }

  ngOnInit(): void {
    this.currentAdmin = this.usersService.usersShowAllList
    this.userType = this.usersService.user.type
    this.adminParamId = this.route.snapshot.paramMap.get('adminId')
    if(this.adminParamId != null){
      this.getUsers(this.adminParamId)
    }else{
      this.getUsers(this.userType)
    }
  }

}
