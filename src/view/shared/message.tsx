import * as toastr from 'toastr';


export default class Message {
  static success(arg) {
    // must be changed change because Bootstrap UI
    // css overrides the style
    toastr.options.toastClass = 'me-3 fas fa-check-circle-2 text-white fs-3';
    toastr.options.positionClass = 'alert alert-success bg-success border-2 d-flex align-items-center toast-bottom-left';
    <button className="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>


    toastr.success(arg);
  }

  
 
  static error(arg) {
    // must be changed change because Bootstrap UI
    // css overrides the style
    toastr.options.toastClass = 'me-3 fas fa-times-circle text-white fs-3';
    toastr.options.positionClass = 'alert alert-danger bg-danger border-2 d-flex align-items-center toast-bottom-left';

    toastr.error(arg);
  }
}
