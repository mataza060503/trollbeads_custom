import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/item';
import { BannerService } from '../../services/banner.service';
import { arrow } from '@popperjs/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit, AfterViewInit{
  contents: {uppercase: string,lowercase: string}[] = [
    {"uppercase": "Cửa hàng trực tuyến mới", "lowercase": "cùng 1 vũ trụ huyền diệu"},
    {"uppercase": "miễn phí vận chuyển", "lowercase": "với đơn hàng từ 3.000.000đ"},
    {"uppercase":"7 ngày đổi trả","lowercase": ""}
  ]

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

  isClicked: boolean[] = []
  isProductListClicked: boolean[] = []
  isSignatureProductClicked: boolean[] = []
  isBeadClicked: boolean[] = []
  isSilverBeadClicked: boolean[] = []

  isOpenTemplate5: boolean = false
  isOpenTemplate5Custom: boolean = false

  products: Product[] = []
  productList: Product[] = []
  signatureProducts: Product[] = []
  beads: Product[] = []
  silverBeads: Product[] = []
  banners: string[] = []

  heroCarouselPercentage: number = 0

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  @ViewChild('heroVideo') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('mediaTL6') videoTL6!: ElementRef<HTMLVideoElement>;

  constructor(private productService: ProductService, private bannerService: BannerService) {
    this.loadBanners()
    this.loadProducts()
    this.loadProductList()
    this.loadSignatureProduct()
    this.loadBeads()
    this.loadSilverBeads()
  }

  playVideo() {
    const media = this.video.nativeElement;
    const mediaTL6 = this.videoTL6.nativeElement;
    media.muted = true;
    mediaTL6.muted = true;
    media.play();
    mediaTL6.play()
  }

  ngAfterViewInit(): void {
    this.playVideo()
  }

  loadProducts() {
    this.productService.getAllProduct().snapshotChanges().subscribe({
      next: (data) => {
        this.products = []
        data.forEach(item => {
          let product = item.payload.toJSON() as Product
          this.products.push(product)
          this.isClicked.push(false)
        });
      }
    })
  }

  loadProductList() {
    this.productService.getAllProductList().snapshotChanges().subscribe({
      next: (data) => {
        this.productList = []
        data.forEach(item => {
          let product = item.payload.toJSON() as Product
          this.productList.push(product)
          this.isProductListClicked.push(false)
        });
      }
    })
  }

  loadSignatureProduct() {
    this.productService.getAllSignatureProduct().snapshotChanges().subscribe({
      next: (data) => {
        this.signatureProducts = []
        data.forEach(item => {
          let product = item.payload.toJSON() as Product
          this.signatureProducts.push(product)
          this.isSignatureProductClicked.push(false)
        });
        this.heroCarouselPercentage = 1/(this.signatureProducts.length)*100
      }
    })
  }

  loadBeads() {
    this.productService.getAllBeads().snapshotChanges().subscribe({
      next: (data) => {
        this.beads = []
        data.forEach(item => {
          let product = item.payload.toJSON() as Product
          this.beads.push(product)
          this.isBeadClicked.push(false)
        });
        this.heroCarouselPercentage = 1/(this.signatureProducts.length)*100
        console.log(this.beads)
      }
    })
  }

  loadSilverBeads() {
    this.productService.getAllSilverBeads().snapshotChanges().subscribe({
      next: (data) => {
        this.silverBeads = []
        data.forEach(item => {
          let product = item.payload.toJSON() as Product
          this.silverBeads.push(product)
          this.isSilverBeadClicked.push(false)
        });
        this.heroCarouselPercentage = 1/(this.signatureProducts.length)*100
        console.log(this.silverBeads)
      }
    })
  }

  loadBanners() {
    this.bannerService.getAllBanner().snapshotChanges().subscribe({
      next: (data) => {
        this.banners = []
        data.forEach(item => {
          let banner = item.payload.toJSON() as string
          this.banners.push(banner)
        });
        console.log(this.banners[0])
      }
    })
  }

  ngOnInit(): void {
    
  }

  heroSlideConfig = {
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrow: false,
    Infinity: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1,
        }
      }
    ]
  };

  template5Config = {
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    Infinity: true,
    dots: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,
        }
      }
    ]
  }

  template5CustomConfig = {
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    Infinity: true,
    dots: true,
    rtl: false,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,
        }
      }
    ]
  }

	slideConfig = {
    "slidesToShow": 1, 
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 5000,
  };
  
  slickInit(e: any) {
    console.log('slick initialized');
  }
  
  breakpoint(e: any) {
    console.log('breakpoint');
  }

  updateHeroProgressBar(event: any) {
    const currentIndex = event.currentSlide;
    const totalSlides = this.signatureProducts.length;

    if (currentIndex === 0) {
      this.heroCarouselPercentage = (1 / totalSlides) * 100;
    } else {
      this.heroCarouselPercentage = ((currentIndex + 1) / totalSlides) * 100;
    }
  }

  favoriteClick(index: number) {
    this.isClicked[index] = !this.isClicked[index]
  }

  activateDropdown() {
    this.isOpenTemplate5 = !this.isOpenTemplate5
  }
  activateDropdownTL5Custom() {
    this.isOpenTemplate5Custom = !this.isOpenTemplate5Custom
  }
  
  ///** ORTHER FUNCTION *////
  formatPrice(price: number): string {
    return price.toLocaleString('de-DE'); // 'de-DE' uses '.' as the thousands separator
  }
}
