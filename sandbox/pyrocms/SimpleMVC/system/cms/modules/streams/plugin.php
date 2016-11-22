<?php defined('BASEPATH') or exit('No direct script access allowed');

/**
 * PyroStreams Plugin
 *
 * @package		PyroStreams
 * @author		Adam Fairholm
 * @copyright	Copyright (c) 2011 - 2013, Adam Fairholm
 */
class Plugin_Streams extends Plugin
{
	/**
	 * Field Types
	 *
	 * @var		obj
	 */
	public $types;
	
	/**
	 * Cache Vars
	 *
	 * These variables control the cache of
	 * PyroStreams tags.
	 */
	public $cache_type				= 'query';		// tag or query
	public $cache_time_format		= 'minutes'; 	// minutes or seconds
	public $cache					= null;			// num of seconds or minutes
	public $cache_hash				= null;
	public $write_tag_cache			= false;		// Whether or not we need
	
	/**
	 * PyroStreams Plugin Construct
	 *
	 * Just a bunch of loads and prep
	 *
	 * @return	void
	 */
	public function __construct()
	{
		$this->load->driver('Streams');

		// Load our PyroStreams-exclusive config
		$this->load->config('streams/streams');

		// Set our core namespace.
		$this->core_namespace = $this->config->item('streams:core_namespace');

		// Get our master cycle params/default list form the API
		$this->entries_params = $this->streams->entries->entries_params;
	}

	/**
	 * PyroStreams attribute function
	 *
	 * Allows you to pass stuff like [segment_1], etc.
	 *
	 * In PyroCMS 2.2, this has been deprecated by the
	 * parse_parameter() function in the Plugins library.
	 *
	 * However, since the syntax is slightly different,
	 * we will keep this around for backwards compat.
	 *
	 * @param	string 	$param
	 * @param	string 	$default
	 * @return	string
	 */	
	public function streams_attribute($param, $default = null)
	{
		$value = $this->attribute($param, $default);
	
		// See if we have any vars in there
		if (strpos($value, '[') !== false)
		{
			$segs = array(
				'segment_1' => $this->uri->segment(1),
				'segment_2' => $this->uri->segment(2),
				'segment_3' => $this->uri->segment(3),
				'segment_4' => $this->uri->segment(4),
				'segment_5' => $this->uri->segment(5),
				'segment_6' => $this->uri->segment(6),
				'segment_7' => $this->uri->segment(7),
				'current_url' => current_url()
			);
						
			// We can only get the user data if it is available
			if ($this->current_user)
			{
				$segs['user_id']	= $this->current_user->id;
				$segs['username']	= $this->current_user->username;
			}

			foreach ($segs as $seg_marker => $segment_value)
			{
				$value = str_replace("[$seg_marker]", $segment_value, $value);
			}
		}
				
		return $value;
	}

	/**
	 * _call
	 *
	 * Fun little method to call a stream without
	 * using cycle. Like:
	 *
	 * {{ streams:stream_slug }}
	 *
	 * @param	string
	 * @param	string
	 * @return	void
	 */
	public function __call($name, $data)
	{
		return $this->cycle($name);
	}
		
	/**
	 * Cycle
	 *
	 * List entries in a stream.
	 *
	 * @param 	string 	$stream_slug Option stream slug to pass.
	 * @return 	string
	 */
	public function cycle($stream_slug = null)
	{
		$this->debug_status		 	= $this->streams_attribute('debug', 'on');

		// -------------------------------------
		// Get Plugin Attributes
		// -------------------------------------
		
		$params = array();
		
		foreach ($this->entries_params as $param_key => $param_default)
		{
			$params[$param_key] = $this->streams_attribute($param_key, $param_default);
		}

		// -------------------------------------
		// Stream Slug Override
		// -------------------------------------
		// If we have a stream slug that has been
		// passed, we will take that value over
		// the passed $params value. This is so
		// if we have {{ streams:stream_slug stream="another" }}
		// We will ignore "another" in favor of "stream_slug"
		// -------------------------------------

		if ($stream_slug)
		{
			$params['stream'] = $stream_slug;
		}

		// -------------------------------------
		// Cache
		// -------------------------------------
		// Setup cache. If we have a full tag cache,
		// we will just go ahead and return that.
		// -------------------------------------

		$this->setup_cache();

		if ( ! is_null($full_tag_cache = $this->full_tag_cache()))
		{
			return $full_tag_cache;
		}

		// -------------------------------------
		// Pagination & Limit
		// -------------------------------------
		// Gather any pagination config overrides
		// from the plugin. Also, set limit if 
		// there is none and we are using pagination.
		// -------------------------------------
		
		$pagination_config = array();
		
		foreach ($this->streams->entries->pag_config as $pag_key)
		{
			if ($this->attribute($pag_key))
			{
				$pagination_config[$pag_key] = $this->attribute($pag_key);
			}
		}
		
		if ($params['paginate'] == 'yes' and ! $params['limit'])
		{
			$params['limit'] = Settings::get('records_per_page');
		}

		// -------------------------------------
		// Set Namespace
		// -------------------------------------
		// We can manually set the namespace
		// via a namespce="" parameter.
		// -------------------------------------

		$params['namespace'] = ($params['namespace']) ? $params['namespace'] : $this->core_namespace;

		// -------------------------------------
		// Stream Data Check
		// -------------------------------------
		// Check for a retrieve our stream.
		// -------------------------------------
		
		if ( ! isset($params['stream']))
		{
			$this->_error_out(lang('streams:no_stream_provided'));
		}


		$stream = $this->streams_m->get_stream($params['stream'], true, $params['namespace']);
				
		if ( ! $stream)
		{
			$this->_error_out(lang('streams:invalid_stream'));
		}

		// -------------------------------------
		// Get Stream Fields
		// -------------------------------------
				
		$this->fields = $this->streams_m->get_stream_fields($stream->id);

		// -------------------------------------
		// Get Rows (Cache if Necessary)
		// -------------------------------------

		// If we are caching, set the correct variables.
		if ($this->cache_type == 'query' and is_numeric($this->cache))
		{
			$params['cache_query'] = true;
			$params['cache_expires'] = $this->cache;
			$params['cache_folder'] = 'streams'.DIRECTORY_SEPARATOR.$stream->stream_namespace;
		}

		$rows = $this->row_m->get_rows($params, $this->fields, $stream);
		
		// -------------------------------------
		// Rename
		// -------------------------------------
		// Allows us to rename variables in our
		// parameters. So, rename:old_name="new_name"
		// -------------------------------------

		$renames = array();

		foreach ($this->attributes() as $key => $to)
		{
			if (substr($key, 0, 7) == 'rename:' and strlen($key) > 7)
			{
				$pieces = explode(':', $key);
			
				$renames[$pieces[1]] = $to;
			}
		}

		if ($renames)
		{
			foreach ($rows['rows'] as $k => $arr)
			{
				foreach ($renames as $from => $to)
				{
					if (isset($rows['rows'][$k][$from]))
					{
						$rows['rows'][$k][$to] = $rows['rows'][$k][$from];
						unset($rows['rows'][$k][$from]);
					}
				}
			}
		}

		// -------------------------------------
		// Set rows to 'entries' var
		// -------------------------------------

		$return['entries'] = $rows['rows'];
				
		// -------------------------------------
		// Keep Vars
		// -------------------------------------
		// Allow vars to pass through by doing
		// keep:{var_name}={var_value}
		// -------------------------------------

		$keepers = array();

		foreach ($this->attributes() as $key => $val)
		{
			if (substr($key, 0, 5) == 'keep:' and strlen($key) > 5)
			{
				$pieces = explode(':', $key);
			
				$keepers[trim($pieces[1])] = $val;
			}
		}

		if ($keepers)
		{
			foreach ($return['entries'] as &$entry)
			{
				$entry = array_merge($entry, $keepers);
			}
		}

		// -------------------------------------
		// Pagination
		// -------------------------------------
		
		if ($params['paginate'] == 'yes')
		{
			$return['total'] 	= $rows['pag_count'];

			$pag_config = array(
				'pag_segment' 		=> $params['pag_segment'],
				'pag_method'		=> $params['pag_method'],
				'pag_query_var'		=> $params['pag_query_var'],
				'pag_uri_method'	=> $params['pag_uri_method'],
				'pag_base'			=> $params['pag_base']
			);

			$return['pagination'] = $this->row_m->build_pagination($pag_config, $params['limit'], $return['total'], $pagination_config);
		}	
		else
		{	
			$return['pagination'] 	= null;
			$return['total'] 		= count($return['entries']);
		}
				
		// -------------------------------------
		// No Results
		// -------------------------------------
		// In the case of no results, we will return
		// our no_results paramter value.
		// -------------------------------------
		
		if ($return['total'] == 0)
		{
			return $this->streams_attribute('no_results', lang('streams:no_results'));
		}

		// -------------------------------------
		// {{ entries }} Bypass
		// -------------------------------------
		// If we don't want to use {{ entries }},
		// we don't have to!
		// -------------------------------------

		$loop = false;

		if (preg_match('/\{\{\s?entries\s?\}\}/', $this->content()) == 0)
		{
			$return = $return['entries'];
			$loop = true;
		}

		// -------------------------------------
		// Parse Ouput Content
		// -------------------------------------

		$return_content = $this->streams->parse->parse_tag_content(
								$this->content(), $return, $params['stream'],
								$this->core_namespace, $loop, $this->fields);
	
		// -------------------------------------
		// Cache End Procedures
		// -------------------------------------

		$this->tag_cache_write($return_content);
		$this->clear_cache_vars();

		// -------------------------------------

		return $return_content;
	}

	/**
	 * Setup the Cache Vars
	 *
	 * Set cache type, time format, and hash
	 *
	 * @return 	void
	 */
	private function setup_cache()
	{
		// 'tag' or 'query'
		$this->cache_type				= $this->streams_attribute('cache_type', 'query');	

		// 'minutes' or 'seconds'
		$this->cache_time_format		= $this->streams_attribute('cache_time_format', 'minutes'); 

		// num of seconds or minutes
		$this->cache					= $this->streams_attribute('cache', null);

		// Format the cache time. It can either be in seconds
		// or minutes depending on a param.
		if (is_numeric($this->cache))
		{
			if ($this->cache_time_format == 'minutes')
			{
				// If they specified minutes we just need to
				// convert it to seconds
				$this->cache = $this->cache*60;
			}
		}

		$this->set_cache_hash();
	}

	/**
	 * Set the cache hash
	 *
	 * This creates a unique cache hash based on the
	 * unique set of tag parameters.
	 *
	 * @return 	void
	 */
	private function set_cache_hash()
	{
		$this->cache_hash = md5(implode('-', $this->attributes()).$this->content());
	}

	/**
	 * Write tag cache if we need to
	 *
	 * @param 	string $content the content to write
	 * @return 	void
	 */
	private function tag_cache_write($content)
	{
		if ($this->write_tag_cache === true)
		{
			$this->pyrocache->write($content, 'pyrostreams'.DIRECTORY_SEPARATOR.$this->cache_hash, $this->cache);
		}		
	}

	/**
	 * Full tag cache
	 *
	 * @return 	mixed null or string
	 */
	private function full_tag_cache()
	{
		if ( ! $this->cache_hash)
		{
			$this->set_cache_hash();
		}

		// Check to see if we have a tag cache.
		if ($this->cache_type == 'tag' and ! is_null($this->cache))
		{
			if ( ! $tag_cache_content = $this->pyrocache->get('pyrostreams'.DIRECTORY_SEPARATOR.$this->cache_hash))
			{
				// Set this so functions know to write the
				// cache when necesary.
				$this->write_tag_cache = true;
			}
			else
			{
				return $tag_cache_content;
			}
		}

		return null;
	}

	/**
	 * Reset the cache vars to their defaults
	 *
	 * @return 	void
	 */
	private function clear_cache_vars()
	{
		$this->cache_type			= 'query';
		$this->cache_time_format	= 'minutes';
		$this->cache				= null;
		$this->cache_hash			= null;
		$this->write_tag_cache		= false;
	}

	/**
	 * Total
	 *
	 * Get the total number of rows for a stream.
	 *
	 * @return	int
	 */
	public function total()
	{
		if ( ! $this->streams_attribute('stream'))
		{
			return null;
		}

		$this->setup_cache();

		$this->load->config('streams/streams');

		if ( ! is_null($this->cache))
		{
			if ( ! $cache_content = $this->pyrocache->get('pyrostreams'.DIRECTORY_SEPARATOR.$this->cache_hash))
			{
				return $this->pyrocache->write(
					$this->db->count_all(STR_PRE.$this->streams_attribute('stream')),
					'pyrostreams'.DIRECTORY_SEPARATOR.$this->cache_hash, $this->cache);

			}
			else
			{
				return $cache_content;
			}
		}
		else
		{
			return $this->db->count_all(STR_PRE.$this->streams_attribute('stream'));
		}
	}
	
	/**
	 * Single
	 *
	 * Show a single stream entry. This just
	 * maps to $this->cycle();
	 *
	 * @return	array
	 */
	public function single()
	{	
		$this->set_attribute('limit', 1);

		return $this->cycle();
	}
	
	/**
	 * Output an input form for a stream
	 *
	 * @return	array
	 */
	public function form()
	{
		// -------------------------------------
		// General Loads
		// -------------------------------------

		$data = new stdClass;
		
		$this->load->library(array('form_validation', 'streams_core/Fields'));
 
		// -------------------------------------
		// Get vars
		// -------------------------------------
		
		$extra = array();

		$mode 					= $this->streams_attribute('mode', 'new');
		
		// Make sure that we have a valid mode.
		if ($mode != 'new' and $mode != 'edit') $mode = 'new';

		$edit_id 				= $this->streams_attribute('edit_id', FALSE);
		$edit_segment 			= $this->streams_attribute('edit_segment', FALSE);
		$stream_slug 			= $this->streams_attribute('stream');
		$stream_segment 		= $this->streams_attribute('stream_segment');
		$where 					= $this->streams_attribute('where');
		$include 				= $this->streams_attribute('include');
		$exclude 				= $this->streams_attribute('exclude');
		$recaptcha 				= $this->streams_attribute('use_recaptcha', 'no');
		$creator_only       	= $this->streams_attribute('creator_only', false);
		$namespace 				= $this->streams_attribute('namespace', $this->core_namespace);

		$extra['required'] 		= $this->streams_attribute('required', '<span class="required">* required</span>');
		$extra['return'] 		= $this->streams_attribute('return', $this->uri->uri_string());
		$extra['error_start'] 	= $this->streams_attribute('error_start', '<span class="error">');
		$extra['error_end']		= $this->streams_attribute('error_end', '</span>');
		
		$this->streams_attribute('use_recaptcha', 'no') == 'yes' ? $recaptcha = TRUE : $recaptcha = FALSE;

		// -------------------------------------
		// Messages
		// -------------------------------------
		// Lang line references:
		// - new_entry_success
		// - new_entry_error
		// - edit_entry_success
		// - edit_entry_error
		// -------------------------------------
		
		$extra['success_message'] 	= $this->streams_attribute('success_message', "lang:streams:{$mode}_entry_success");
		$extra['failure_message'] 	= $this->streams_attribute('failure_message', "lang:streams:{$mode}_entry_error");
							
		// -------------------------------------
		// Get Stream Data
		// -------------------------------------
		
		$data->stream			= $this->streams_m->get_stream($stream_slug, true, $namespace);
		
		if ( ! $data->stream) return lang('streams:invalid_stream');
		
		$data->stream_id		= $data->stream->id;

		// -------------------------------------
		// Collect Email Notification Data
		// -------------------------------------
		// Default is two notifications. We collect
		// this data no matter what and the 
		// form library takes care of the rest.
		// -------------------------------------
	
		$notifications 			= array();

		$numbers = array('a', 'b');
	
		foreach ($numbers as $notify_num)
		{
			$notifications[$notify_num]['notify'] 		= $this->streams_attribute('notify_'.$notify_num);
			$notifications[$notify_num]['template'] 	= $this->streams_attribute('notify_template_'.$notify_num);
			$notifications[$notify_num]['from'] 		= $this->streams_attribute('notify_from_'.$notify_num);
		}		
		
		$extra['email_notifications'] = $notifications;
		
		// -------------------------------------
		// Get Edit ID from URL if in Edit Mode
		// -------------------------------------
		
		$row = false;
		
		if ($mode == 'edit')
		{
			// Do they want us to grab the ID from the URL?
			if (is_numeric($edit_segment))
			{
				$edit_id = $this->uri->segment($edit_segment);
			}
			
			// Do they want a where?
			// This overrides the edit_id
			if ($where)
			{
				$bits = explode('==', $where);
				
				if (count($bits) == 2)
				{
					$query = $this->db->limit(1)->where($bits[0], $bits[1])->get($data->stream->stream_prefix.$data->stream->stream_slug);
					
					if($query->num_rows() == 1)
					{
						// WTF is this doing? It gets
						// overwritten anyways.
						$row = $query->row();	
						$edit_id = $row->id;
					}
				}
			}
			else
			{
				// Get the row
				$row = $this->row_m->get_row($edit_id, $data->stream, FALSE);
			}			
		}

		// -------------------------------------
		// Check Author Only
		// -------------------------------------
		// If this mode is on edit, and it is set
		// to creator_only, we can check to see
		// if the editor is the creator.
		// -------------------------------------

		if ($creator_only == 'yes' and $mode == 'edit')
		{
			// Must be logged in
			if ( ! isset($this->current_user->id))
			{
				return null;
			}

			if ($this->current_user->id != $row->created_by)
			{
				return null;
			}
		}

		// -------------------------------------
		// Include/Exclude
		// -------------------------------------

		$skips = $this->determine_skips($include, $exclude, $data->stream_id);

		// -------------------------------------
		// Form key
		// -------------------------------------
		// Add a unique identifier to the form. This is needed if
		// you have multiple stream forms per page. If they are new entry forms,
		// there is no real way to determine a unique identifer, so the user
		// will need to add one themselves. This is a little different for editing
		// forms, 
		// -------------------------------------

		$hidden = array();

		if ($form_key = $this->streams_attribute('form_key'))
		{
			$hidden['_streams_form_key'] = $form_key;
			$extra['form_key'] = $form_key;
		}
		elseif ($mode == 'edit')
		{
			$hidden['_streams_form_key'] = $data->stream->stream_namespace.'_'.$data->stream->stream_slug.'_'.$row->id;
			$extra['form_key'] = $hidden['_streams_form_key'];
		}

		// -------------------------------------
		// Process and Output Form Data
		// -------------------------------------
	
		$vars['fields'] = $this->fields->build_form($data->stream, $mode, $row, true, $recaptcha, $skips, $extra);

		// We can't have a form if we have no fields.
		if ( ! $vars['fields']) return;

		// -------------------------------------
		// Individual Field Access 
		// -------------------------------------
		// For greater form control, this allows
		// users to access each form item
		// indivudally.
		// -------------------------------------

		foreach($vars['fields'] as $field)
		{
			$vars[$field['input_slug']]['label'] 			= lang_label($field['input_title']);
			$vars[$field['input_slug']]['slug'] 			= $field['input_slug'];
			$vars[$field['input_slug']]['value'] 			= $field['value'];

			if($field['input_parts'] !== false)
			{
				$vars[$field['input_slug']]['input']		= $field['input_parts'];
				$vars[$field['input_slug']]['input_built']	= $field['input'];
			}
			else
			{
				$vars[$field['input_slug']]['input']		= $field['input'];
				$vars[$field['input_slug']]['input_built']	= $field['input'];
			}

			$vars[$field['input_slug']]['error_raw'] 		= $field['error_raw'];
			$vars[$field['input_slug']]['error'] 			= $field['error'];
			$vars[$field['input_slug']]['is_required'] 		= ($field['required']) ? true : false;
			$vars[$field['input_slug']]['required'] 		= $field['required'];
			$vars[$field['input_slug']]['odd_even'] 		= $field['odd_even'];
			$vars[$field['input_slug']]['instructions']		= $field['instructions'];
		}
		
		// -------------------------------------
		// reCAPTCHA
		// -------------------------------------
		
		if ($recaptcha)
		{
			$this->load->library('streams_core/recaptcha');

			$this->recaptcha->_rConfig['theme'] = $this->streams_attribute('recaptcha_theme', 'red');

			$vars['recaptcha'] = $this->recaptcha->get_html();

			// Output the error if we have one
			if ($this->form_validation->field_data('recaptcha_response_field'))
			{
				$vars['recaptcha_error'] = $this->form_validation->error('recaptcha_response_field');
			}	
			else
			{
				$vars['recaptcha_error'] = '';
			}
		}
		
		// -------------------------------------
		// Basic Form elements
		// -------------------------------------
		
		$params['class']		= $this->streams_attribute('form_class', 'crud_form');
		$params['id']			= $this->streams_attribute('form_id');
				
		// Add a row_edit_id where needed
		if ($mode == 'edit')
		{
			$hidden['row_edit_id'] = $row->id;
		}

		// Always add a stream_id to the form.
		$hidden['stream_id'] = $data->stream_id;

		// -------------------------------------
		// Compile {{ tag }} form elements
		// -------------------------------------

		$vars['form_open']		= form_open_multipart($this->uri->uri_string(), $params, $hidden);	
		$vars['form_close']		= '</form>';
		$vars['form_submit']	= '<input type="submit" value="'.lang('save_label').'" />';
		$vars['form_reset']		= '<input type="reset" value="'.lang('streams:reset').'" />';
		$vars['validation_errors'] = validation_errors($extra['error_start'], $extra['error_end']);

		// -------------------------------------
		
		return array($vars);				
	}

	/**
	 * Determine the fields to skip
	 * based on include/exclude
	 *
	 * @param 	string 	$include
	 * @param 	string 	$exclude
	 * @param 	int 	$stream_id
	 * @param 	obj 	$stream_fields
	 */
	private function determine_skips($include, $exclude, $stream_id, $stream_fields = null)
	{
		$skips = array();

		if ($include)
		{
			$includes = explode('|', $include);

			if (is_null($stream_fields))
			{
				$stream_fields = $this->streams_m->get_stream_fields($stream_id);
			}

			// We need to skip everything else
			foreach ($stream_fields as $field)
			{
				if ( ! in_array($field->field_slug, $includes))
				{
					$skips[] = $field->field_slug;
				}
			}
		}
		if ($exclude)
		{
			// Exlcudes are just our skips
			$excludes = explode('|', $exclude);
		
			$skips = array_merge($excludes, $skips);
		}

		return $skips;
	}
	
	/**
	 * Form assets
	 *
	 * @return	string
	 */	
	public function form_assets()
	{
		if ( ! empty($this->type->assets))
		{
			// Weird fix that seems to work for fixing WYSIWYG
			// since it is throwing missing variable errors
			$html = '<script type="text/javascript">var SITE_URL = "'.$this->config->item('base_url').'";</script>';
		
			foreach($this->type->assets as $asset)
			{
				$html .= $asset."\n";
			}
			
			return $html;
		}
	}

	/**
	 * Form CSRF input
	 *
	 * You might need this if you are not using the {{ form_open }} variable.
	 *
	 * @return 	mixed
	 */
	public function form_csrf()
	{
		if ($this->config->item('csrf_protection'))
		{
			return form_hidden($this->security->get_csrf_token_name(), $this->security->get_csrf_hash());
		}		
	}
	
	/**
	 * Form Fields
	 *
	 * Allows you to simple show form fields without 
	 */
	public function form_fields()
	{
		$this->load->library(array('form_validation', 'streams_core/Fields'));

		$mode 				= $this->streams_attribute('mode', 'new');
		$edit_id 			= $this->streams_attribute('edit_id', false);
		$stream_slug 		= $this->streams_attribute('stream');
		$namespace 			= $this->streams_attribute('namespace', $this->core_namespace);
		$include 			= $this->streams_attribute('include');
		$exclude 			= $this->streams_attribute('exclude');
		$required 			= $this->streams_attribute('required', '<span class="required">* required</span>');
		
		// -------------------------------------
		// Get Stream Data
		// -------------------------------------
		
		$data->stream			= $this->streams_m->get_stream($stream_slug, true, $namespace);
		
		if ( ! $data->stream) return lang('streams:invalid_stream');
		
		$data->stream_id		= $data->stream->id;
		$vars = array();

		// -------------------------------------
		// Get the row in edit mode
		// -------------------------------------
		
		$row = false;
		
		if ($mode == 'edit')
		{
			$row = $this->row_m->get_row($edit_id, $data->stream, false);
		}

		// -------------------------------------
		// Set up skips & values
		// -------------------------------------

		$stream_fields = $this->streams_m->get_stream_fields($data->stream_id);

		$skips = $this->determine_skips($include, $exclude, $data->stream_id, $stream_fields);

		$values = $this->fields->set_values($stream_fields, $row, $mode, $skips);

		// -------------------------------------
		// Get & Return Fields
		// -------------------------------------

		$vars['fields'] = $this->fields->build_fields($stream_fields, $values, $row, $mode, $skips, $required);		

		// -------------------------------------
		// Individual Field Access 
		// -------------------------------------
		// For greater form control, this allows
		// users to access each form item
		// indivudally.
		// -------------------------------------

		foreach($vars['fields'] as $field)
		{
			$vars[$field['input_slug']]['label'] 			= $field['input_title'];
			$vars[$field['input_slug']]['slug'] 			= $field['input_slug'];
			$vars[$field['input_slug']]['value'] 			= $field['value'];

			if($field['input_parts'] !== false)
			{
				$vars[$field['input_slug']]['input']		= $field['input_parts'];
				$vars[$field['input_slug']]['input_built']	= $field['input'];
			}
			else
			{
				$vars[$field['input_slug']]['input']		= $field['input'];
				$vars[$field['input_slug']]['input_built']	= $field['input'];
			}

			$vars[$field['input_slug']]['error_raw'] 		= $field['error_raw'];
			$vars[$field['input_slug']]['error'] 			= $field['error'];
			$vars[$field['input_slug']]['is_required'] 		= ($field['required']) ? true : false;
			$vars[$field['input_slug']]['required'] 		= $field['required'];
			$vars[$field['input_slug']]['odd_even'] 		= $field['odd_even'];
		}

		return array($vars);				
	}
	
	/**
	 * Delete a row field
	 *
	 * @return	mixed
	 */
	public function delete_entry()
	{
		// -------------------------------------
		// General Loads
		// -------------------------------------

		$this->load->library(array('form_validation', 'streams_core/Fields'));

		// -------------------------------------
		// Get vars
		// -------------------------------------

		$stream_slug 			= $this->streams_attribute('stream');
		$namespace 				= $this->streams_attribute('namespace', $this->core_namespace);
		$entry_id 				= $this->streams_attribute('entry_id', false);
		$return 				= $this->streams_attribute('return', '');
		$vars					= array();

		// -------------------------------------
		// Create Hidden Hash
		// -------------------------------------

		$hidden['delete_id'] = md5($stream_slug.$entry_id);

		// -------------------------------------
		// Get Stream Data
		// -------------------------------------
		
		$stream			= $this->streams_m->get_stream($stream_slug, true, $namespace);
		
		if ( ! $stream) show_error(lang('streams:invalid_stream'));
	
		// -------------------------------------
		// Check Delete
		// -------------------------------------
	
		if (
			$this->input->post('delete_confirm')
			and $this->input->post('delete_id') == $hidden['delete_id']
		)
		{
			$this->db->where('id', $entry_id)->delete($stream->stream_prefix.$stream->stream_slug);
			
			$this->load->helper('url');
			
			redirect(str_replace('-id-', $entry_id, $return));
		}	
		else
		{
			// -------------------------------------
			// Get stream fields
			// -------------------------------------
			
			$this->fields = $this->streams_m->get_stream_fields($stream->id);

			// -------------------------------------
			// Get entry data
			// -------------------------------------
			// We may want to display it 
			// -------------------------------------
			
			$params = array(
				'stream'		=> $stream->stream_slug,
				'namespace'		=> $namespace,
				'id' 			=> $entry_id,
				'limit'			=> 1,
				'offset'		=> 0,
				'order_by'		=> false,
				'exclude'		=> false,
				'show_upcoming'	=> null,
				'show_past'		=> null,
				'where'			=> null,
				'disable'		=> array(),
				'year'			=> null,
				'month'			=> null,
				'day'			=> null,
				'restrict_user'	=> 'no',
				'single'		=> 'yes'
			);

			$rows = $this->row_m->get_rows($params, $this->fields, $stream);
			
			if ( ! isset($rows['rows'][0])) return $this->streams_attribute('no_entry', lang('streams:no_entry'));
			
			$vars['entry'][0] = $rows['rows'][0];
	
			// -------------------------------------
			// Parse other vars
			// -------------------------------------

			$vars['form_open'] 		= form_open($this->uri->uri_string(), null, $hidden);
			$vars['form_close']		= '</form>';
			$vars['delete_confirm']	= '<input type="submit" name="delete_confirm" value="'.lang('streams:delete').'" />';
			
			$rows = null;
			
			return array($vars);
		}
	}

	/**
	 * Default Calendar Template
	 *
	 * @var		string
	 */
	public $calendar_template = '
	
	   {table_open}<table border="0" cellpadding="0" cellspacing="0">{/table_open}
	
	   {heading_row_start}<tr>{/heading_row_start}
	
	   {heading_previous_cell}<th><a href="{previous_url}">&lt;&lt;</a></th>{/heading_previous_cell}
	   {heading_title_cell}<th colspan="{colspan}">{heading}</th>{/heading_title_cell}
	   {heading_next_cell}<th><a href="{next_url}">&gt;&gt;</a></th>{/heading_next_cell}
	
	   {heading_row_end}</tr>{/heading_row_end}
	
	   {week_row_start}<tr>{/week_row_start}
	   {week_day_cell}<td>{week_day}</td>{/week_day_cell}
	   {week_row_end}</tr>{/week_row_end}
	
	   {cal_row_start}<tr>{/cal_row_start}
	   {cal_cell_start}<td>{/cal_cell_start}
	
	   {cal_cell_content}{day}{content}{/cal_cell_content}
	   {cal_cell_content_today}<div class="highlight">{day}{content}</div>{/cal_cell_content_today}
	
	   {cal_cell_no_content}{day}{/cal_cell_no_content}
	   {cal_cell_no_content_today}<div class="highlight">{day}</div>{/cal_cell_no_content_today}
	
	   {cal_cell_blank}&nbsp;{/cal_cell_blank}
	
	   {cal_cell_end}</td>{/cal_cell_end}
	   {cal_row_end}</tr>{/cal_row_end}
	
	   {table_close}</table>{/table_close}
	';

	/**
	 * Calendar
	 *
	 * @return	string
	 */
	public function calendar()
	{
		// -------------------------------------
		// Cache
		// -------------------------------------

		$this->setup_cache();

		if ( ! is_null($full_tag_cache = $this->full_tag_cache()))
		{
			return $full_tag_cache;
		}

		// -------------------------------------
		// Get vars
		// -------------------------------------
	
		$passed_streams 		= $this->streams_attribute('stream');
		$date_fields_passed		= $this->streams_attribute('date_field', 'created');
		$year 					= $this->streams_attribute('year', date('Y'));
		$year_segment 			= $this->streams_attribute('year_segment');
		$month 					= $this->streams_attribute('month', date('n'));
		$month_segment 			= $this->streams_attribute('month_segment');
		$passed_display 		= $this->streams_attribute('display', '<strong>[id]</strong>');
		$passed_link 			= $this->streams_attribute('link', '');
		$title_col				= $this->streams_attribute('title_col', 'id');
		$template				= $this->streams_attribute('template', FALSE);

		// -------------------------------------
		// Figure out year & month
		// -------------------------------------

		if (is_numeric($year_segment) AND is_numeric($this->uri->segment($year_segment)))
		{
			$year = $this->uri->segment($year_segment);
		}

		if (is_numeric($month_segment) and is_numeric($this->uri->segment($month_segment)))
		{
			$month = $this->uri->segment($month_segment);
		}

		// Default to current
		if ( ! is_numeric($year)) $year = date('Y');
		if ( ! is_numeric($month)) $month = date('n');

		// -------------------------------------
		// Run through streams & create
		// calendar data
		// -------------------------------------
		
		$calendar = array();
		
		$displays		= explode("|", $passed_display);
		$links			= explode("|", $passed_link);
		$streams 		= explode("|", $passed_streams);
		$date_fields 	= explode("|", $date_fields_passed);
		
		$count = 0;
				
		foreach ($streams as $stream_slug)
		{
			$date_field = $date_fields[$count];

			$stream = $this->streams_m->get_stream($stream_slug, TRUE, $this->core_namespace);
	
			$this->fields = $this->streams_m->get_stream_fields($stream->id);
			
			$params = array(
				'date_by'	 	=> $date_field,
				'get_day' 		=> TRUE,
				'year' 			=> $year,
				'month' 		=> $month
			);

			// -------------------------------------
			// Get rows
			// -------------------------------------

			if ($this->cache_type == 'query' and ! is_null($this->cache))
			{
				$rows = $this->pyrocache->model('row_m', 'get_rows', array($params, $this->fields, $stream), $this->cache);
			}
			else
			{
				$rows = $this->row_m->get_rows($params, $this->fields, $stream);
			}

			$this->clear_cache_vars();
				
			// -------------------------------------
			// Format Calendar Data
			// -------------------------------------
			
			foreach ($rows as $above)
			{
				foreach ($above as $entry)
				{
					if (isset($displays[$count]))
					{
						// Replace fields				
						$display_content 	= $displays[$count];
						$link_content 		= $links[$count];
			
						$parser = new Lex_Parser();
						$parser->scope_glue(':');
						
						$display_content = str_replace(array('[', ']'), array('{{ ', ' }}'), $display_content);
						$link_content = str_replace(array('[', ']'), array('{{ ', ' }}'), $link_content);
													
						$display_content = $parser->parse($display_content, $entry, array($this->parser, 'parser_callback'));
						$link_content = $parser->parse($link_content, $entry, array($this->parser, 'parser_callback'));
									
						// Link
						if ($link_content != '' )
						{
							$display_content = '<a href="'.site_url($link_content).'" class="'.$stream_slug.'_link">'.$display_content.'</a>';
						}							
						
						// Adding to the array
						if (isset($calendar[$entry['pyrostreams_cal_day']]))
						{
							$calendar[$entry['pyrostreams_cal_day']] .= $display_content.'<br />';
						}
						else
						{
							$calendar[$entry['pyrostreams_cal_day']]  = $display_content.'<br />';
						}
					}
				}
			}
					
			$count++;
		}
				
		// -------------------------------------
		// Get Template
		// -------------------------------------

		if ($template)
		{
			$this->db->limit(1)->select('body')->where('title', $template);
			$db_obj = $this->db->get('page_layouts');
			
			if($db_obj->num_rows() > 0)
			{
				$layout = $db_obj->row();
				$this->calendar_template = $layout->body;
			}
		}
	
		// -------------------------------------
		// Generate Calendar
		// -------------------------------------
		
		$calendar_prefs['template']			= $this->calendar_template;
		$calendar_prefs['start_day']		= strtolower($this->streams_attribute('start_day', 'sunday'));
		$calendar_prefs['month_type']		= $this->streams_attribute('month_type', 'long');
		$calendar_prefs['day_type']			= $this->streams_attribute('day_type', 'abr');
		$calendar_prefs['show_next_prev']	= $this->streams_attribute('show_next_prev', 'yes');
		$calendar_prefs['next_prev_url']	= $this->streams_attribute('next_prev_uri', '');

		if ($calendar_prefs['show_next_prev'] == 'yes')
		{
			$calendar_prefs['show_next_prev'] = true;
		}
		else
		{
			$calendar_prefs['show_next_prev'] = false;
		}

		$this->load->library('calendar', $calendar_prefs);

		$return_content = $this->calendar->generate($year, $month, $calendar);

		// -------------------------------------
		// Cache End Procedures
		// -------------------------------------

		$this->tag_cache_write($return_content);

		$this->clear_cache_vars();

		// -------------------------------------

		return $return_content;
	}

	/**
	 * Seach Form
	 *
	 * @return	string
	 */
	function search_form()
	{
		$this->load->helper('form');
	
		$stream_slug 	= $this->streams_attribute('stream');
		$namespace 		= $this->streams_attribute('namespace', $this->core_namespace);
		$fields 		= $this->streams_attribute('fields');

		$string = 		implode('.', $this->attributes());
		$form_id 		= md5($string);
		
		$search_types 	= array('keywords', 'full_phrase');
		
		$search_type 	= strtolower($this->streams_attribute('search_type', 'full_phrase'));
		$results_page	= $this->streams_attribute('results_page');
		$variables		= array();

		// -------------------------------------
		// Get the Stream
		// -------------------------------------

		if ( ! $stream = $this->streams_m->get_stream($stream_slug, true, $namespace)) {
			$this->_error_out(lang('streams:invalid_stream'));
		}

		// -------------------------------------
		// Set Fields
		// If no fields, get all the fields.
		// -------------------------------------

		if ( ! $fields) {
			
			$dbFields = $this->db->list_fields($stream->stream_prefix.$stream->stream_slug);
		
			$skip = array('id', 'created', 'updated', 'created_by', 'ordering_count');

			foreach ($dbFields as $f) {
				if ( ! in_array($f, $skip)) {
					$fields[] = $f;
				}
			}

			$fields = implode('|', $fields);
		}

		// -------------------------------------
		// Check our search type
		// -------------------------------------
		
		if ( ! in_array($search_type, $search_types)) {
			show_error($search_type.' '.lang('streams:invalid_search_type'));
		}

		// -------------------------------------
		// Check for our search term
		// -------------------------------------
		
		if (isset($_POST['search_term']) 
				and $this->input->post('form_identifier') == $form_id)
		{
			$this->load->model('streams/search_m');
			
			// Write cache
			$cache_id = $this->search_m->perform_search(
				$this->input->post('search_term'),
				$search_type,
				$stream_slug,
				$fields,
				$this->core_namespace);
		
			// Redirect
			$this->load->helper('url');
			redirect($results_page.'/'.$cache_id);
		}
		
		// -------------------------------------
		// Build Form
		// -------------------------------------

		// Add a hidden form identifier
		$hidden = array('form_identifier' => $form_id);

		$vars['form_open']			= form_open($this->uri->uri_string(), '', $hidden);

		$search_input = array(
		              'name'        => 'search_term',
		              'id'          => 'search_term');
		
		$vars['search_input'] 		= form_input($search_input);
		$vars['form_submit'] 		= form_submit('search_submit', lang('streams:search'));
		$vars['form_close'] 		= '</form>';

		return array($vars);
	}
	
	/**
	 * Search Results
	 *
	 * @return	string
	 */
	function search_results()
	{
		$paginate		= $this->streams_attribute('paginate', 'yes');
		$cache_segment	= $this->streams_attribute('cache_segment', 3);
		$per_page		= $this->streams_attribute('per_page', Settings::get('records_per_page'));
		$variables		= array();

		// -------------------------------------
		// Check for Cached Search Query
		// -------------------------------------

		$this->load->model('streams/search_m');

		if ( ! $cache = $this->search_m->get_cache($this->uri->segment($cache_segment)))
		{
			// Invalid search
			show_error(lang('streams:search_not_found'));
		}

		$stream = $this->streams_m->get_stream($cache->stream_slug, true, $cache->stream_namespace);

		$this->fields = $this->streams_m->get_stream_fields($stream->id);

		// Easy out for no results
		if ($cache->total_results == 0)
		{
			return array(
				'no_results' 		=> $this->streams_attribute('no_results', lang('streams:no_results')),
				'results_exist'		=> false,
				'results'			=> array(),
				'pagination'		=> null,
				'search_term' 		=> $this->streams_attribute('search_term', $cache->search_term),
				'total_results'		=> (string)'0'
			);		
		}
		
		$return = array('total' => $cache->total_results);
	
		// -------------------------------------
		// Pagination
		// -------------------------------------
		
		if ($paginate) {

			$pagination_config = array();
		
			// Go through each config and see if we have an attribute for it.
			foreach ($this->streams->entries->pag_config as $pag_key)
			{
				if ($this->attribute($pag_key))
				{
					$pagination_config[$pag_key] = $this->attribute($pag_key);
				}
			}
			
			// Our default per page is our records_per_page setting.
			if ($paginate == 'yes' and ! $per_page)
			{
				$per_page = Settings::get('records_per_page');
			}

			// Pagination segment is always right after the cache hash segment
			$pag_segment = $cache_segment+1;

			// Build our actual pagination.
			$return['pagination'] = $this->row_m->build_pagination($pag_segment, $per_page, $return['total'], $pagination_config);

			// Offset 
			$offset = $this->uri->segment($pag_segment);

			if ( ! $offset or ! is_numeric($offset) or $offset < 0) {
				$offset = 0;
			}

			// Add the query string to the cached SQL query so
			$query_string = $cache->query_string." LIMIT $offset, $per_page";

		} else {

			$query_string = null;
			$return['pagination'] 	= null;
		}

		// -------------------------------------
		// Get & Format Results
		// -------------------------------------

		$return['results'] = $this->row_m->format_rows(
									$this->db->query($query_string)->result_array(),
									$stream);

		// -------------------------------------
		// Extra Data
		// -------------------------------------

		$return['no_results'] 		= '';
		$return['total_results'] 	= $cache->total_results;
		$return['results_exist'] 	= true;				
		$return['search_term'] 		= $cache->search_term;

		return $this->streams->parse->parse_tag_content(
							$this->content(), $return, $stream->stream_slug,
							$stream->stream_namespace, false);
	}
	
	/**
	 * Output debug message or just
	 * return FALSE.
	 *
	 * @param	string
	 * @return 	mixed
	 */	
	private function _error_out($msg)
	{
		return ($this->debug_status == 'on') ? show_error($msg) : false;
	}

	/**
	 * Format date variables
	 *
	 * Legacy. This is now done by the date helper
	 * or in the datetime field type.
	 *
	 * @return	string formatted date
	 */
	public function date()
	{
	 	$date_formats = array('DATE_ATOM', 'DATE_COOKIE', 'DATE_ISO8601', 'DATE_RFC822', 'DATE_RFC850', 'DATE_RFC1036', 'DATE_RFC1123', 'DATE_RFC2822', 'DATE_RSS', 'DATE_W3C');
	 	
		$date 		= $this->attribute('date');
		$format 	= $this->attribute('format');
		
		// No sense in trying to get down
		// with somedata that isn't there
		if ( ! $date or ! $format) return NULL;
		
		$this->load->helper('date');
	
		// Make sure we have a UNIX date
		if ( ! is_numeric($date)) $date = mysql_to_unix($date);
		
		// Is this a preset?
		if (in_array($format, $date_formats)) return standard_date($format, $date);

		// Default is PHP date		
		return date($format, $date);
	}

}