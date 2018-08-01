'use strict';

import GalleryDriver from '../../../test/drivers/reactDriver';
import React from 'react';
import SlideshowView from './slideshowView';
import {expect} from 'chai';
import sinon from 'sinon';

describe('Slideshow View', () => {

  let driver;
  let initialGalleryViewProps;
  let galleryViewProps;

  beforeEach(() => {
    driver = new GalleryDriver();
    initialGalleryViewProps = driver.props.galleryView();
    Object.assign(initialGalleryViewProps.styleParams, {
      oneRow: true
    });
  });

  describe('init of different items', () => {

    it('init one item gallery', () => {
      Object.assign(initialGalleryViewProps, {
        items: [initialGalleryViewProps.items[0]]
      });
      galleryViewProps = driver.props.galleryView(initialGalleryViewProps);
      driver.mount(SlideshowView, galleryViewProps);
      expect(driver.find.hook('gallery-column').length).to.equal(1);
      expect(driver.find.selector('GalleryDebugMessage').length).to.equal(1);
    });

    it('init empty gallery', () => {
      Object.assign(initialGalleryViewProps, {
        items: []
      });
      galleryViewProps = driver.props.galleryView(initialGalleryViewProps);
      driver.mount(SlideshowView, galleryViewProps);
      expect(driver.find.hook('gallery-column').length).to.equal(0);
    });

    it('should show next-arrow if more then one item, otherwise no next-arrow', () => {
      //expect images-moch.testImages to contain more than 1 image
      //=> more than 1 item
      galleryViewProps = driver.props.galleryView(initialGalleryViewProps);
      driver.mount(SlideshowView, galleryViewProps);
      expect(driver.find.hook('nav-arrow-next').length).to.equal(1);
      expect(driver.find.hook('nav-arrow-back').length).to.equal(0);
      //one item
      Object.assign(initialGalleryViewProps, {
        items: [initialGalleryViewProps.items[0]]
      });
      galleryViewProps = driver.props.galleryView(initialGalleryViewProps);
      driver.mount(SlideshowView, galleryViewProps);
      expect(driver.find.hook('nav-arrow-next').length).to.equal(0);
      expect(driver.find.hook('nav-arrow-back').length).to.equal(0);
    });
  });

  describe('Scroll', () => {

    it('Handle keypress correctly (next/prev image)', () => {
      galleryViewProps = driver.props.galleryView(initialGalleryViewProps);
      driver.mount(SlideshowView, galleryViewProps);
      expect(driver.get.state('currentIdx')).to.equal(0);
      //nextItem - forward
      driver.get.instance().handleKeypress({keyCode: 39, charCode: null, preventDefault() {}, stopPropagation() {}});
      expect(driver.get.state('currentIdx')).to.equal(1);
      driver.get.instance().handleKeypress({keyCode: 40, charCode: null, preventDefault() {}, stopPropagation() {}});
      expect(driver.get.state('currentIdx')).to.equal(2);
      driver.get.instance().handleKeypress({keyCode: null, charCode: 32, preventDefault() {}, stopPropagation() {}});
      expect(driver.get.state('currentIdx')).to.equal(3);
      driver.get.instance().handleKeypress({keyCode: null, charCode: 34, preventDefault() {}, stopPropagation() {}});
      expect(driver.get.state('currentIdx')).to.equal(4);
      //nextItem - backward
      driver.get.instance().handleKeypress({keyCode: 38, charCode: null, preventDefault() {}, stopPropagation() {}});
      expect(driver.get.state('currentIdx')).to.equal(3);
      driver.get.instance().handleKeypress({keyCode: 37, charCode: null, preventDefault() {}, stopPropagation() {}});
      expect(driver.get.state('currentIdx')).to.equal(2);
      driver.get.instance().handleKeypress({keyCode: null, charCode: 33, preventDefault() {}, stopPropagation() {}});
      expect(driver.get.state('currentIdx')).to.equal(1);
    });

    it('Handle nav arrows click correctly (next/prev image)', () => {
      Object.assign(initialGalleryViewProps.scroll, {
        top: 1
      });
      galleryViewProps = driver.props.galleryView(initialGalleryViewProps);
      driver.mount(SlideshowView, galleryViewProps);
      expect(driver.get.state('currentIdx')).to.equal(0);
      driver.find.hook('nav-arrow-next').simulate('click');
      expect(driver.get.state('currentIdx')).to.equal(1);
      driver.find.hook('nav-arrow-next').simulate('click');
      expect(driver.get.state('currentIdx')).to.equal(2);
      driver.find.hook('nav-arrow-back').simulate('click');
      expect(driver.get.state('currentIdx')).to.equal(1);
    });
  });

  describe('Thumbnails', () => {

    it('Thumbnails are created if layout is Thumbnails', () => {
      Object.assign(initialGalleryViewProps.styleParams, {
        hasThumbnails: true
      });
      galleryViewProps = driver.props.galleryView(initialGalleryViewProps);
      driver.mount(SlideshowView, galleryViewProps);
      expect(driver.find.hook('gallery-thumbnails').length).to.equal(1);
      expect(driver.find.hook('gallery-thumbnails-column').length).to.not.equal(0);
    });
  });

  // describe('Auto Slideshow', () => {

  //   it('startAutoSlideshow is called if needed', () => {
  //     Object.assign(initialGalleryViewProps.styleParams, {
  //       isAutoSlideshow: false,
  //       autoSlideshowInterval: 10
  //     });
  //     galleryViewProps = driver.props.galleryView(initialGalleryViewProps);
  //     const stub = sinon.stub(SlideshowView.prototype, 'startAutoSlideshow');
  //     driver.mount(SlideshowView, galleryViewProps);
  //     expect(stub.called).to.equal(false);

  //     Object.assign(initialGalleryViewProps.styleParams, {
  //       isAutoSlideshow: true,
  //       autoSlideshowInterval: 0
  //     });
  //     galleryViewProps = driver.props.galleryView(initialGalleryViewProps);
  //     driver.mount(SlideshowView, galleryViewProps);
  //     expect(stub.called).to.equal(false);

  //     Object.assign(initialGalleryViewProps.styleParams, {
  //       isAutoSlideshow: true,
  //       autoSlideshowInterval: 10
  //     });
  //     galleryViewProps = driver.props.galleryView(initialGalleryViewProps);
  //     driver.mount(SlideshowView, galleryViewProps);
  //     expect(stub.called).to.equal(true);
  //     stub.restore();
  //   });
  // });

});

