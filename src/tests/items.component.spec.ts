import 'reflect-metadata';
import { ItemsComponent } from "~/app/item/items.component";
import { nsTestBedAfterEach, nsTestBedRender, nsTestBedBeforeEach } from "nativescript-angular/testing";
import { MockService, ItemService } from "~/app/item/item.service";
import { ComponentFixture } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { dumpView } from './util';

//https://github.com/angular/angular/issues/29281
//https://github.com/NativeScript/nativescript-angular/blob/master/tests/app/tests/platform-filter-components.ts

describe("Items Component", function() {

  
beforeEach(nsTestBedBeforeEach(
    [ItemsComponent],
    [{provide: ItemService, useClass: MockService}]  
  ));

afterEach(nsTestBedAfterEach());


it("Items Component loaded", () => {
    return nsTestBedRender(ItemsComponent).then((fixture: ComponentFixture<ItemsComponent>) => {
      const componentRef: ComponentRef<ItemsComponent> = fixture.componentRef;
      const instance = componentRef.instance;
      expect(instance).toBeTruthy();
    });
  });


  it("Add Items ", () => {
    return nsTestBedRender(ItemsComponent).then((fixture: ComponentFixture<ItemsComponent>) => {
      const componentRef: ComponentRef<ItemsComponent> = fixture.componentRef;
      const instance = componentRef.instance;
      expect(instance.items.length).toEqual(2);

    });
  });
  

  it("View is rendered", () => {
    return nsTestBedRender(ItemsComponent).then((fixture: ComponentFixture<ItemsComponent>) => {
      const componentRef: ComponentRef<ItemsComponent> = fixture.componentRef;
      const instance = componentRef.instance;
      const nativeElement = fixture.nativeElement;
      expect(dumpView(nativeElement, true).indexOf("(label[text=Ashish Pradhan])")).toBeGreaterThan(-1);
    });
  });


});
