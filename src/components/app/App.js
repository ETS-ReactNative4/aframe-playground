import "aframe";
import "aframe-orbit-controls";
import React, { Component } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    TextField,
    withStyles
} from "@material-ui/core";

const TEXTURES = [
    "assets/car/object_car_main_Base_Color_blue.png",
    "assets/car/object_car_main_Base_Color_grey.png",
    "assets/car/object_car_main_Base_Color_red.png",
    "assets/car/object_car_main_Base_Color_yellow.png"
];

const ANNOATIONS = [];

const THREE = window.THREE;

class App extends Component {
    state = {
        texture: 0,
        annotationId: 0,
        show: false,
        form: {},
        annotations: [],
        annotation: {}
    };

    selectAnnotation = () => annotationId => {
        this.setState({ annotationId });
    };

    handleChange = name => event => {
        const field = event.currentTarget;
        this.setState((state) => ({
            ...state,
            form: {
                ...state.form,
                [name]: field.type === 'file' ? field.files[0] : field.value
            }
        }));
    };
    
    handleCancel = () => {
        this.setState({ show: false })
    }

    addAnnotation = () => {
        this.setState({
            annotations: [...this.state.annotations, this.state.form],
            show: false,
            form: {}
        });
    };
    
    render() {
        return (
            <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
                <a-scene>
                    <a-sky src="/assets/test.png" rotation="0 -130 0"></a-sky>
                    {/*<a-sphere />*/}
                </a-scene>
            </div>
        )
    }

    // render() {
    //     const { annotationId, form, annotations, show, annotation = {} } = this.state;
    //     return (
    //         <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
    //             <a-scene
    //                 background="color: #E5E5E5"
    //                 stats
    //                 embedded
    //                 style={{ flex: 1 }}
    //             >
    //                 <a-assets>
    //                     <a-asset-item
    //                         id="crate-obj"
    //                         src="assets/car/object_car.obj"
    //                     />
    //                     <a-asset-item
    //                         id="crate-mtl"
    //                         src="assets/car/object_car.mtl"
    //                     />
    //                 </a-assets>
    //                 <a-entity
    //                     id="camera"
    //                     camera
    //                     orbit-controls={`
    //                         minDistance: 3;
    //                         maxDistance: 6;
    //                         initialPosition: 0 2 4;
    //                         maxPolarAngle: 85;
    //                     `}
    //                     cursor="rayOrigin: mouse"
    //                 />
    //                 <a-sphere
    //                     onClick={() => this.setState({ texture: 0 })}
    //                     wireframe={this.state.texture === 0}
    //                     color="#132a8f"
    //                     radius="0.25"
    //                     position="-2 2.5 0"
    //                     material="metalness: 0.3; roughness: 0.2"
    //                 />
    // 
    //                 <a-sphere
    //                     onClick={() => this.setState({ texture: 1 })}
    //                     wireframe={this.state.texture === 1}
    //                     color="#4b4c4f"
    //                     radius="0.25"
    //                     position="-0.7 2.5 0"
    //                     material="metalness: 0.3; roughness: 0.3"
    //                 />
    //                 <a-sphere
    //                     onClick={() => this.setState({ texture: 2 })}
    //                     wireframe={this.state.texture === 2}
    //                     color="#a80000"
    //                     radius="0.25"
    //                     position="0.7 2.5 0"
    //                     material="metalness: 0.3; roughness: 0.3"
    //                 />
    //                 <a-sphere
    //                     onClick={() => this.setState({ texture: 3 })}
    //                     wireframe={this.state.texture === 3}
    //                     color="#c88e1f"
    //                     radius="0.25"
    //                     position="2 2.5 0"
    //                     material="metalness: 0.3; roughness: 0.3"
    //                 />
    //                 <a-entity
    //                     shadow="receive: false"
    //                     material={`
    //                         src: ${TEXTURES[this.state.texture]};
    //                         metalnessMap: assets/car/object_car_main_Metallic.png;
    //                         roughnessMap: assets/car/object_car_main_Roughness.png;
    //                     `}
    //                     obj-model="obj: #crate-obj;"
    //                     rotation="0 90 0"
    //                     onClick={e => {
    //                         // const camera = document.querySelector("#camera");
    //                         // const marker = document.createElement("a-sphere");
    //                         // marker.setAttribute(
    //                         //     "position",
    //                         //     e.detail.intersection.point.add(
    //                         //         new THREE.Vector3(0, 0, 0.05)
    //                         //     )
    //                         // );
    //                         // //  marker.setAttribute("geometry", `
    //                         // //     primitive: circle;
    //                         // //     radius: 0.06;
    //                         // // `);
    //                         // // marker.setAttribute("text", "value: A; width: 2; align: center");
    //                         // marker.setAttribute("radius", "0.05");
    //                         // marker.setAttribute("material", "color: black");
    //                         // marker.addEventListener("mouseenter", ee => {
    //                         //     ee.target.setAttribute("color", "yellow");
    //                         // });
    //                         // marker.addEventListener("mouseleave", ee => {
    //                         //     ee.target.setAttribute("color", "black");
    //                         // });
    //                         // e.target.sceneEl.appendChild(marker);
    //                         // console.log(camera.object3D);
    //                         const p = e.detail.intersection.point.add(
    //                             new THREE.Vector3(0, 0, 0.05)
    //                         );
    //                         this.setState({
    //                             show: true,
    //                             form: {
    //                                 position: `${p.x} ${p.y} ${p.z}`
    //                             }
    //                         });
    //                     }}
    //                 />
    //                 {annotations.map(annotation => (
    //                     <a-sphere
    //                         key={annotation.position}
    //                         radius={0.05}
    //                         color="purple"
    //                         position={annotation.position}
    //                         onClick={e => {
    //                             e.target.setAttribute('color', 'yellow');
    //                             this.setState({ annotation })
    //                         }}
    //                     />
    //                 ))}
    //             </a-scene>
    //             <div style={{ width: "400px", padding: 16 }}>
    //                 <h1>{annotation.title}</h1>
    //                 <img
    //                     src={annotation.image && window.URL.createObjectURL(annotation.image)}
    //                     alt="annotation-media"
    //                     style={{ width: "100%", height: "300px" }}
    //                 />
    //                 <p>{annotation.description}</p>
    //             </div>
    // 
    //             <Dialog open={show}>
    //                 <DialogContent>
    //                     <TextField
    //                         autoFocus
    //                         label="Title"
    //                         variant="outlined"
    //                         fullWidth
    //                         value={form.title}
    //                         onChange={this.handleChange("title")}
    //                     />
    //                     <TextField
    //                         name="description"
    //                         label="Description"
    //                         variant="outlined"
    //                         fullWidth
    //                         margin="normal"
    //                         value={form.description}
    //                         onChange={this.handleChange("description")}
    //                     />
    //                     <input
    //                         accept="image/*"
    //                         id="contained-button-file"
    //                         type="file"
    //                         style={{ display: "none" }}
    //                         onChange={this.handleChange("image")}
    //                     />
    //                     <label htmlFor="contained-button-file">
    //                         <Button
    //                             component="span"
    //                             color="secondary"
    //                             variant="outlined"
    //                         >
    //                             Select Image
    //                         </Button>
    //                     </label>
    //                 </DialogContent>
    //                 <DialogActions>
    //                     <Button onClick={this.handleCancel} color="primary">
    //                         Cancel
    //                     </Button>
    //                     <Button
    //                         onClick={this.addAnnotation}
    //                         color="primary"
    //                     >
    //                         Add annotation
    //                     </Button>
    //                 </DialogActions>
    //             </Dialog>
    //         </div>
    //     );
    // }
}

export default App;
