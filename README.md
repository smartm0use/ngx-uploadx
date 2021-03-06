# ngx-uploadx

> Angular Resumable Upload Module

[![npm version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]

## Key Features

- Pause / Resume / Cancel Uploads
- Retries using exponential back-off strategy
- Chunking

## Setup

- Add ngx-uploadx module as dependency :

```sh
  npm install ngx-uploadx
```

- Import UploadxModule:

```ts
//...
import { UploadxModule } from 'ngx-uploadx';

@NgModule({
  imports: [
    UploadxModule,
   // ...
});
```

## Basic usage

```ts
// Component code
//...
import { Observable } from 'rxjs';
import { UploadxOptions, UploadState } from 'ngx-uploadx';

@Component({
  selector: 'app-home',
  templateUrl: `
  <input type="file" [uploadx]="options" (uploadxState)="onUpload($event)">
  `
})

export class AppHomeComponent {
  options: UploadxOptions = { url: `[URL]`};
  onUpload(state: Observable<UploadState>) {
    state
      .subscribe((item: UploadState) => {
         console.log(item);
         //...
      }
 }
```

> Please navigate to the [src/app sub-folder](src/app) for more detailed examples

## Server-side setup

- [node-uploadx](https://github.com/kukhariev/node-uploadx)

## Options

- `allowedTypes`: Allowed file types (directive only)

- `autoUpload`: Auto start upload when files added. Default value: `true`

- `chunkSize`: Set a fixed chunk size. If not specified, the optimal size will be automatically adjusted based on the network speed.

- `concurrency`: Set the maximum parallel uploads. Default value: `2`

- `headers`: Headers to be appended to each HTTP request

- `metadata`: Custom uploads metadata

- `uploaderClass`: provide a user-defined class to support another upload protocol or to extend an existing one. Examples : [internal](src/uploadx/src/uploaderx.ts) and [uploader-examples](uploader-examples)

- `token`: Authorization token as a `string` or function returning a `string` or `Promise<string>`

- `endpoint`: URL to create new uploads. Default value: `'/upload'`

## Directive

```html
<input
  type="file"
  [uploadx]="options"
  [uploadxAction]="control"
  (uploadxState)="onUpload($event)"
/>
```

### Selector

- `uploadx`

### inputs

- `[uploadx]: UploadxOptions`

  Set options

- `[uploadxAction]: UploadxControlEvent`

  Control the uploads status

### Output

- `(uploadxState): ($event: <Observable>UploadState)=> void`

## UploadxService

- `init(options?: UploadxOptions): Observable<UploadState>`

  Initializes service. Returns Observable that emits a new value on progress or status changes

  ```ts
  //  @example:
  uploadxOptions: UploadxOptions = {
    concurrency: 4,
    endpoint: `${environment.api}/upload`,
    token:  () => localStorage.getItem('access_token'),
  };
  ngOnInit() {
    this.uploadService.init(this.uploadxOptions)
      .subscribe((item: UploadState) => {
        console.log(item);
        //...
      }
  }
  ```

- `connect(options?: UploadxOptions): Observable<Uploader[]>`

  Initializes service. Returns Observable that emits the current queue

  ```ts
  // @example:
  @Component({
    template: `
      <input type="file" uploadx">
      <div *ngFor="let item of uploads$ | async">{{item.name}}</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class UploadsComponent {
    uploads$: Observable<Uploader[]>;
    options: UploadxOptions = {
      endpoint: `${environment.api}/upload?uploadType=uploadx`,
      token:  () => localStorage.getItem('access_token'),
    }
    constructor(private uploadService: UploadxService) {
      this.uploads$ = this.uploadService.connect(this.options);
    }
  ```

- `disconnect(): void`

  Terminate all uploads and clears the queue

- `handleFile(file: File): void`

  Create Uploader for the file and add to the queue

- `handleFileList(fileList: FileList): void`

  Add files to the upload queue

- `control(event: UploadxControlEvent): void`

  Control the uploads status

  ```ts
  // @example:
  pause(uploadId: string) {
    this.uploadService.control({ action: 'pause', uploadId });
  }
  ```

- `queue: Uploader[]`

  Uploaders array

- `events: Observable<UploadState>`

  Unloads status events

## Run demo

- Start server `npm run server`
- Run demo app `npm start`
- Navigate to `http://localhost:4200/`

## Build

Run `npm run build` to build the lib.

> _packaged by_ [ng-packagr](https://github.com/dherges/ng-packagr)

## Contributing

Pull requests are welcome!

## References

- [https://developers.google.com/drive/v3/web/resumable-upload](https://developers.google.com/drive/v3/web/resumable-upload)

## License

The MIT License (see the [LICENSE](LICENSE) file for the full text)

[npm-image]: https://img.shields.io/npm/v/ngx-uploadx.svg
[npm-url]: https://www.npmjs.com/package/ngx-uploadx
[travis-image]: https://travis-ci.org/kukhariev/ngx-uploadx.svg?branch=master
[travis-url]: https://travis-ci.org/kukhariev/ngx-uploadx
