package conf

var Routes = map[string]interface{}{
	"GET /": controllers.Index.index,
}
