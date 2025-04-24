import React from "react";

export class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.opened === true) {
      return (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          
          <div
            className="modal relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target.className == 'flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0') {
                this.props.close();
              }
            }}
          >
            <div
              className="fixed inset-0 bg-gray-500/75 transition-opacity"
              aria-hidden="true"
            ></div>
            
            <div className="modal_content fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
								<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 md:w-full md:h-full md:max-w-1/2 md:max-h-1/2">
									<div className="bg-white flex flex-col justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-center flex-col text-black">
                    <div className="close_button_container w-full">
                  <button
                    onClick={this.props.close}
                    className="close_button text-black text-left"
                  >
                    X
                  </button>
                </div>
											{this.props.children}
										</div>
									</div>
								</div>
                
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}