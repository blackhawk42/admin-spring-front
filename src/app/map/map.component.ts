import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { DataApiService } from '../services/data-api.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map;

  selectedEstado;
  selectedMunicipio;
  selectedUnidad;

  arrEstados = [];
  arrMunicipios = [];
  arrActividades = [];
  arrLocalidades = [];
  poblacion = null;

  constructor(private markerService: MarkerService,
    private dataApiService: DataApiService
    ) 
    { }

  ngAfterViewInit(): void {
    this.initMap();
    //this.markerService.makeCapitalMarkers(this.map);
    this.getEstados();
    this.getUnidades();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

 private getEstados()
 {
  this.dataApiService.getEstados().subscribe((estados: any) => {
    this.arrEstados = estados.content;
   });
 
 }

 private getUnidades()
 {
  this.dataApiService.getUnidades().subscribe((unidades: any) => {
    this.arrActividades = unidades.content;
   });
 
 }
 
 private changeEstado()
 {
   this.dataApiService.getMunicipios(this.selectedEstado)
   .subscribe((municipios: any) => {
    this.arrMunicipios = municipios;

   });
 
 }

 changeMunicipio()
 {
   this.dataApiService.getlocalidades(this.selectedMunicipio, this.selectedEstado)
   .subscribe((localidades: any) => {
     
    this.arrLocalidades = localidades;

   });
 
 }

 changeLocalidad()
 {
   this.dataApiService.getPoblacion(this.selectedMunicipio, this.selectedEstado, this.selectedMunicipio)
   .subscribe((poblacion: any) => {
     
    this.poblacion = poblacion[0].pobtot;

   });
 
 }
 

 private buscarDenues()
 {

  this.markerService.makeDenuesMarkers(this.map,
    this.selectedEstado,
    this.selectedMunicipio,
    this.selectedUnidad
    );

 }

 
}