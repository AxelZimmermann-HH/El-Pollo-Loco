// Bessere Formel zur Kollisionsberechnung (Genauer)
function isColliding(obj) {
    return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
            (this.Y + this.offsetY + this.height) >= obj.Y &&
            (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
            obj.onCollisionCourse; 
}

// Optional: hiermit könnten wir schauen, ob ein Objekt 
            //sich in die richtige Richtung bewegt. Nur dann kollidieren wir.
            //Nützlich bei Gegenständen, auf denen man stehen kann. 