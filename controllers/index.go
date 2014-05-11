package controllers

import (
	"github.com/schleumer/go-mvc"
	"time"
)

type Index struct{}

func (c Index) Index(w gomvc.Wrapper) {
	w.Session.Values["xd"] = "lel"
	w.SaveSession()
	w.Render("index.html")
}

func (c Index) Test(w gomvc.Wrapper) {
	w.Write(w.Session.Values["xd"].(string))
}

func (c Index) Pool(w gomvc.Wrapper) {
	w.Push("Gay")
	amt := time.Duration(1000)
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	w.End()
}
