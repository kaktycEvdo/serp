import React from "react";

export class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.opened === true) {
      return (
        <div
          className="fixed z-10 w-full"
          aria-labelledby="modal-title"
        >
          <div
            className="fixed z-10 flex justify-center w-full"
            aria-labelledby="modal-title"
            onClick={(e) => {
              if (
                e.target.className ==
                "flex items-end justify-center p-4 text-center sm:items-center sm:p-0"
              ) {
                this.props.close();
              }
            }}
          >

            <div className={"modal_content fixed bottom-5 sm:top-0 w-2xl h-fit overflow-y-auto"} onClick={() => this.props.close()}>
              <div className="flex items-start justify-center text-center sm:items-center sm:p-0 w-full">
                <div className={"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 md:w-full md:h-full md:max-w-1/2 md:max-h-1/2 border-t-2 "+(this.props.status == 0 ? "border-t-emerald-700" : "border-t-red-700")}>
                  <div className="bg-white flex flex-col justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-center flex-col text-black">
                      <div className="close_button_container w-full">
                        <button
                          onClick={this.props.close}
                          className="close_button text-white text-center rounded-md border-2 border-red-950 w-7 h-7 bg-red-700 hover:cursor-pointer"
                        >
                          X
                        </button>
                      </div>
                      <div className={(this.props.status == 0 ? "text-emerald-700" : "text-red-700")}>
                      {this.props.children}
                      </div>
                      
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
