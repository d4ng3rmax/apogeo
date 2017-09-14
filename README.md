# Apogeo


## Datatable Workaround Fix

package.json:  
  
"devDependencies": {
    ...
    "@types/jquery": "2.0.34",
    ...
  
tsconfig.json:  
  
{
  "compilerOptions": {
    ...
    "paths": {
      "@angular/*": [
        "../node_modules/@angular/*"
      ]
    }
  }
}