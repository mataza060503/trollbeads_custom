import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/item';
import { BannerService } from '../../services/banner.service';

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

  products: Product[] = []
  productList: Product[] = []
  signatureProducts: Product[] = []
  banners: string[] = []

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  @ViewChild('heroVideo') video!: ElementRef<HTMLVideoElement>;

  constructor(private productService: ProductService, private bannerService: BannerService) {
    this.loadBanners()
    this.loadProducts()
    this.loadProductList()
    this.loadSignatureProduct()
  }

  playVideo() {
    const media = this.video.nativeElement;
    media.muted = true; // without this line it's not working although I have "muted" in HTML
    media.play();
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
        console.log(this.products)
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
        console.log(this.productList)
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
        console.log(this.productList)
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
    "slidesToShow": 3, 
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 5000,
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

  favoriteClick(index: number) {
    this.isClicked[index] = !this.isClicked[index]
  }
  
  ///** ORTHER FUNCTION *////
  formatPrice(price: number): string {
    return price.toLocaleString('de-DE'); // 'de-DE' uses '.' as the thousands separator
  }
}
