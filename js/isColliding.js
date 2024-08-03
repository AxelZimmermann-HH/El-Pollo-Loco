// Bessere Formel zur Kollisionsberechnung (Genauer)
function isColliding(mo) {
    return  (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
            (this.y + this.offsetY + this.height) >= mo.y &&
            (this.y + this.offsetY) <= (obj.y + mo.height) && 
            mo.onCollisionCourse; 
}

// Optional: hiermit könnten wir schauen, ob ein Objekt 
            //sich in die richtige Richtung bewegt. Nur dann kollidieren wir.
            //Nützlich bei Gegenständen, auf denen man stehen kann. 