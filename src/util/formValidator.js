export const Validator ={
    validate: (form,formConstraint,formError)=>{
        for(const property in form){
            for(const constraint in formConstraint){
                switch (constraint){
                    case  Constraint.REQUIRED:
                        break;
                    case Constraint.EMAIL:
                        break;
                    case Constraint.MAXLENGTH:
                        break;
                    case Constraint.MINLENGTH:
                        break;
                    default:
                        //nothing
                };
            }           
        }
    }
}

export const Constraint = {
    REQUIRED: "required",
    EMAIL: "email",
    MAXLENGTH: "maxlength",
    MINLENGTH: "minlenght"
}