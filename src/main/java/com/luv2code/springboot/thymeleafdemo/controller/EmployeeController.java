package com.luv2code.springboot.thymeleafdemo.controller;

import com.luv2code.springboot.thymeleafdemo.entity.Employee;
import com.luv2code.springboot.thymeleafdemo.service.EmployeeService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/employees")
public class EmployeeController {

	//define our employee-service
  private EmployeeService employeeService;
  //set up constructor for constructor injection
	//if we have only one constructor @Autowired is optional
  public EmployeeController(EmployeeService theEmployeeService){
	  employeeService = theEmployeeService;
  }

	// add mapping for "/list"
	@GetMapping("/list")
	public String listEmployees(Model theModel) {
        //get the employees from database
	  List<Employee> theEmployees = employeeService.findAll();
		// add to the spring model
		// our thymeleaf template uses this data
		theModel.addAttribute("employees", theEmployees);
		return "employees/list-employees";
	}
   @GetMapping("/showFormForAdd")
	public String showFormForAdd(Model theModel){
	  //create model attribute to bind the form data
	   Employee  addEmployee = new  Employee();
	   theModel.addAttribute("employee", addEmployee);
	   return "employees/employee-form";
   }
   @PostMapping("/save")
	public String saveEmployee(@ModelAttribute("employee") Employee theEmployee){
	       //save the employee
		   employeeService.save(theEmployee);
		   //use a redirect to prevent duplicate submission
		   return "redirect:/employees/list";
   }
   @GetMapping("/showFormForUpdate")
	public String showFormForUpdate(@RequestParam("employeeId") int theId,Model theModel){
       //get employee from the service
	   Employee theEmployee = employeeService.findById(theId);

	   //set employee in the model to prepopulate the form
	   theModel.addAttribute("employee", theEmployee);

	   //send over the form
	   return "employees/employee-form";

   }
	@GetMapping("/deleteEmployee")
	public String deleteEmployee(@RequestParam("employeeId") int theId,Model theModel){

		employeeService.deleteById(theId);

		return "redirect:/employees/list";

	}
}









